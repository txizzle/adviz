Subscribers = new Mongo.Collection("subscribers");
Queries = new Mongo.Collection("queries");
Crimes = new Mongo.Collection("crimes");

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyAE55WmfZ5OYJQyV4WIXbHaFA6UsvY9zJ8',
      libraries: 'places'
    });
			
		/* IronRouter routes */
		Router.configure({
			loadingTemplate: 'loading'
		});
			
		Router.route('/', {
			template: 'index'
		});

		Router.route('/home');
		Router.route('/admin');
		Router.route('/crimemap', function() {
			Session.set('dashPage', 'map');
			this.render('crimemap');
		});
		Router.route('/index');
		Router.route('/olddashboard');
		Router.route('/reportcrime', function() {
			Session.set('dashPage', 'report');
			this.render('reportcrime');
		});
		Router.route('/login');
		Router.route('/register');
		Router.route('/dashboard', function() {
			Session.set('dashPage', 'overview');
			this.render('dashboard');
		});
  });
	
	/* Dashboard Session Variable Initialization */
	Session.set('dashPage', 'overview');
  
//	Template.registerHelper('getBody', function () {
//		return Session.get('loadingSplash') ? currPage : 'loading';
//	});
	
	Template.registerHelper('isOverview', function(input){
		return Session.get("dashPage") === 'overview';
	});
	
	Template.registerHelper('isMap', function(input){
		return Session.get("dashPage") === 'map';
	});
	
	Template.registerHelper('isReport', function(input){
		return Session.get("dashPage") === 'report';
	});
	
	
	Template.dashboard.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	});
	
	Template.loading.rendered = function () {
		if ( ! Session.get('loadingSplash') ) {
			console.log("Loading!!!");
			this.loading = window.pleaseWait({
				logo: '/img/adviz_logo.png',
				backgroundColor: '#7f8c8d',
				loadingHtml: message + spinner
			});
			Session.set('loadingSplash', true); // just show loading splash once
		}
	};

	Template.loading.destroyed = function () {
		if ( this.loading ) {
			this.loading.finish();
		}
	};

	var message = '<p class="loading-message">adViz is loading!</p>';
	var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';	
	
  Template.subscribers_overview.helpers({
    subscribers: function() {
      return Subscribers.find({});
    }
  });

  Template.facebook_users.helpers({
    queries: function() {
      return Queries.find({});
    }
  });

  Template.crimemap.helpers({
    crimeMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(17.6883, 83.2186),
          zoom: 16
        };
      }
    }
  });
  
  Template.crimemap.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('crimeMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });
	
	Template.navbar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
	});
		
	Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
				Meteor.loginWithPassword(emailVar, passwordVar, function(error){
						if(error){
								alert(error.reason);
						}
						else {
								Router.go("/dashboard");
						}
				});
		}
	});
		
	Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
				Accounts.createUser({
						email: emailVar,
						password: passwordVar
				}, function(error){
						if(error){
								alert(error.reason);
						} else {
								Router.go("/dashboard"); // Redirect user if registration succeeds
						}
				});
		}
	});

  Template.facebook_messaging.events({
    'submit .send-message': function(event) {
      // Prevent default browser form submit
      console.log("sending message");
      event.preventDefault();

      // Get value from form element
      var msg = event.target.message.value;
      var id = event.target.id.value;
      Meteor.call('sendMessage', id,msg);
      // Clear form
      event.target.message.value = "";
      event.target.id.value = "";
    }
  });

  Template.facebook_users.events({
    'submit .add-subscriber': function(event) {
      event.preventDefault();
      var fb_id = event.target.fb_id.value;
      var phone = event.target.phone.value;
      Meteor.call('addSubscriber', fb_id, phone, function(err, res) {
        if(err) return console.error(err);
      });
      event.target.fb_id.value = "";
      event.target.phone.value = "";
    },
    'submit .search-user': function(event) {
      event.preventDefault();
      var name = event.target.text.value;
      Meteor.call('searchUser', name, function(err, res) {
        if(err) return console.error(err);
        console.log("Callback returned!");
      });
      event.target.text.value = "";
    }
  });
  
  Template.reportcrime.events({
    'submit .report-crime': function(event) {
      event.preventDefault();
      var type = event.target.type.value;
      var desc = event.target.desc.value;
      var lat = event.target.lat.value;
      var lng = event.target.lng.value;
      var time = event.target.time.value;
      
      Crimes.insert({
              type: type,
              desc: desc,
              time: time,
              lat: lat,
              lng: lng
            });
      event.target.type.value = "";
      event.target.desc.value = "";
    }
  });
  
  Template.reportcrime.onRendered(function() {
    this.autorun(function () {
      if (GoogleMaps.loaded()) {
        $("#crime-location").geocomplete({
          map: "#crime-location-map",
          details: "form",
          markerOptions: {
            draggable: true
          }
        });
        
        $("#crime-location").bind("geocode:dragged", function(event, latLng){
          $("input[name=lat]").val(latLng.lat());
          $("input[name=lng]").val(latLng.lng());
          $("#reset").show();
        });
        
        $("#reset").click(function(){
          $("#crime-location").geocomplete("resetMarker");
          $("#reset").hide();
          return false;
        });
        
        $("#find").click(function(){
          $("#crime-location").trigger("geocode");
        }).click();
      }
    });
  });
  
  Template.reportcrime.helpers({
    crimeMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(17.6883, 83.2186),
          zoom: 16,
					scrollwheel: true
        };
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    //hacky way to clear searches
    Queries.remove({});

    //setup SMTP for email verification
    smtp = {
      username: 'adviz.bot@gmail.com',   // eg: server@gentlenode.com
      password: 'smartvizag',
      server:   'smtp.gmail.com',  // eg: mail.gandi.net
      port: 465
    };

    // process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    process.env.MAIL_URL="smtp://adviz.bot%40gmail.com:smartvizag@smtp.gmail.com:465/"; 

  });

  Meteor.methods({
    'sendMessage': function sendMessage(id,message) {
      var login = Meteor.npmRequire('facebook-chat-api');

      login({
        email: "adviz.bot@gmail.com",
        password: "smartvizag"
      }, Meteor.bindEnvironment(function callback(err, api) {
        console.log("logging in now");
        if (err) return console.error(err);
        console.log("logged in!");
        //need to implement threadID for group chats
        var fb_id = Subscribers.findOne({id: id}).fb_id;
        console.log("fb id: " + fb_id);
        api.sendMessage(message, fb_id);
      }));

      //Twilio
      var accountSid = 'AC53db7a939b89ebd3bd9646b5fd1bb9e4';
      var authToken = '8361eaec0af9fc521cbaa4e877bd0af5';
      var client = Meteor.npmRequire('twilio')(accountSid, authToken);

      //TODO: parse phone number to make sure it is ########## without () or -
      var phone = "+1" + Subscribers.findOne({id: id}).phone
      client.messages.create({
        from: "+13236723849",
        to: phone,
        body: message,
      }, function(err, res) {
        console.log(res.sid);
      });
    },
    'addSubscriber': function addSubscriber(id,phone) {
      var login = Meteor.npmRequire('facebook-chat-api');
      login({email: "adviz.bot@gmail.com", password: "smartvizag"}, Meteor.bindEnvironment(function callback (err, api) {
          if(err) return console.error(err);

          api.getUserInfo(id, Meteor.bindEnvironment(function(err, ret) {
            if(err) return console.error(err);
            console.log(ret);
            console.log(ret[id]['name']);
            Subscribers.insert({
              id: (Subscribers.find().count() + 1).toString(),
              fb_id: id,
              name: ret[id]['name'],
              gender: ret[id]['gender'],
              phone: phone
            });
          }));
      }));
    },
    'searchUser': function searchUser(name) {
      var login = Meteor.npmRequire('facebook-chat-api');
      var q;
      login({
        email: "adviz.bot@gmail.com",
        password: "smartvizag"
      }, Meteor.bindEnvironment(function callback(err, api) {
        console.log("logging in now");
        if (err) return console.error(err);
        console.log("logged in!");

        api.getUserID(name, Meteor.bindEnvironment(function(err, data) {
          if (err) return callback(err);
          Queries.remove({})
          console.log(data);
          console.log("what");
          for (i = 0; i < data.length; i++) {
            Queries.insert({
              name: data[i]['name'],
              userID: data[i]['userID'],
              category: data[i]['category'],
              photoUrl: data[i]['photoUrl']
            });
          }
        }));
      }));
    }
  });


  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });
}

