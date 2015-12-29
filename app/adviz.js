if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyAE55WmfZ5OYJQyV4WIXbHaFA6UsvY9zJ8',
      libraries: 'places,visualization'
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
	
	Template.registerHelper('isQuestion', function(input){
		return Session.get("dashPage") === 'question';
	});
	
	Template.registerHelper('isProfile', function(input){
		return Session.get("dashPage") === 'profile';
	});
	
	Template.registerHelper('isAlert', function(input){
		return Session.get("dashPage") === 'alert';
	});
	
	
	Template.dashboard.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	});
	
	Template.question.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	});
	
	Template.report_crime.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	});
	
	Template.crime_map.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	});
	
	Template.profile.onRendered(function () {
			var self = this;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

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
	
	
	
  Template.crime_map.helpers({
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
  
  Template.crime_map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
		GoogleMaps.load({libraries: 'visualization' });
//		https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization&sensor=true_or_false"
    GoogleMaps.ready('crimeMap', function(map) {
      // Add a marker to the map once it's ready
			data = Crimes.find({});
			
			data.forEach(function (row) {
				var marker = new google.maps.Marker({
        	position: {lat: row.location.lat, lng: row.location.lng},
        	map: map.instance,
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 4,
						fillColor: 'black',
						strokeColor: 'black'
					}
      	});
			});
			
			var sampleCrimes = [
				new google.maps.LatLng(17.6886, 83.2189),
				new google.maps.LatLng(17.6886, 83.2193),
				new google.maps.LatLng(17.6890, 83.2130),
				new google.maps.LatLng(17.6891, 83.2340),
				new google.maps.LatLng(17.6820, 83.2750),
				new google.maps.LatLng(17.6830, 83.2160),
				new google.maps.LatLng(17.6834, 83.2683),
				new google.maps.LatLng(17.6842, 83.2172),
				new google.maps.LatLng(17.6701, 83.2501),
				new google.maps.LatLng(17.6823, 83.2420),
				new google.maps.LatLng(17.6810, 83.2021),
				new google.maps.LatLng(17.6814, 83.2101),
				new google.maps.LatLng(17.6890, 83.2289),
				new google.maps.LatLng(17.6912, 83.1402),
				new google.maps.LatLng(17.6920, 83.1920)
			]
			
			var crimeArray = new google.maps.MVCArray(sampleCrimes);
			
			for (var i = 0; i < sampleCrimes.length; i++) {
				var marker = new google.maps.Marker({
        	position: sampleCrimes[i],
        	map: map.instance,
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 4,
						fillColor: 'black',
						strokeColor: 'black'
					}
      	});
			}
			
			var heatMapLayer = new google.maps.visualization.HeatmapLayer({
				data: crimeArray,
				radius: 50
			});
			
			heatMapLayer.setMap(map.instance);
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
				var firstVar = event.target.firstName.value;
				var lastVar = event.target.lastName.value;
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
				Accounts.createUser({
						first: firstVar,
						last: lastVar,
						email: emailVar,
						password: passwordVar
				}, function(error){
						if(error){
								alert(error.reason);
						} else {
								console.log("Sending to dashboard");
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
  
  Template.report_crime.events({
    'submit .report-crime': function(event) {
      event.preventDefault();
      var category = event.target.type.value;
      var desc = event.target.desc.value;
      var lat = event.target.lat.value;
      var lng = event.target.lng.value;
      var time = event.target.time.value;
      
      Crimes.insert({
              category: category,
              desc: desc,
              time: time,
              lat: lat,
              lng: lng
            });
      event.target.type.value = "";
      event.target.desc.value = "";
			event.target.time.value = "";
    }
  });
  
  Template.report_crime.onRendered(function() {
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
  
  Template.report_crime.helpers({
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
	
		
	AutoForm.addHooks(['crimeForm'], {
		onSuccess: function (operation, result, template) {
						alert('Crime successfully reported!');
						Router.go("crimemap");
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


