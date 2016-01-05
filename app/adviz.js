if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyAE55WmfZ5OYJQyV4WIXbHaFA6UsvY9zJ8',
      libraries: 'places,visualization'
    });
		UI.registerHelper("Meteor", Meteor);
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
	
	Template.registerHelper('isTrends', function(input){
		return Session.get("dashPage") === 'trends';
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
	
	Template.registerHelper('isAlerts', function(input){
		return Session.get("dashPage") === 'alerts';
	});
	
	Template.registerHelper('isAdmin', function(input) {
		return Session.get("dashPage") === 'admin';
	});
		
	Template.registerHelper('isUserAdmin', function(input) {
		console.log(Meteor.user().profile.isAdmin);
		return Meteor.user().profile.isAdmin;
	});
	
	function renderAdminLTE(context) {
		var self = context;
			if (self.view.isRendered) {
					var body = $('body');
							body.removeClass();
							body.addClass("skin-green sidebar-mini fixed");

					$(function () {
							MeteorAdminLTE.run()
					});
			}
	}
	
	Template.dashboard.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.question.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.report_crime.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.crime_map.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.trends.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.past_alerts.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.profile.onRendered(function () {
			renderAdminLTE(this);
	});
	
	Template.admin.onRendered(function () {
			renderAdminLTE(this);
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
	
  Template.users_overview.helpers({
    users: function() {
      return Meteor.users.find({});
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
    },
		totalCrimes: function() {
			return Crimes.find({}).count() + 15;
		},
		percentUserSubmitted: function() {
			return Math.round(Crimes.find({}).count()/(Crimes.find({}).count() + 15)*100);
		}
  });
  
  Template.crime_map.onCreated(function() {
    GoogleMaps.ready('crimeMap', function(map) {
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
			data = Crimes.find({});
			
			data.forEach(function (row) {
				sampleCrimes.push(new google.maps.LatLng(row.location.lat, row.location.lng));
//				var marker = new google.maps.Marker({
//        	position: {lat: row.location.lat, lng: row.location.lng},
//        	map: map.instance,
//					icon: {
//						path: google.maps.SymbolPath.CIRCLE,
//						scale: 4,
//						fillColor: 'black',
//						strokeColor: 'black'
//					}
//      	});
			});
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
	
	Template.dash_navbar.events({
    'click #dash_logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('dashboard');
    }
	});
	
	Template.dash_control_sidebar.events({
		'click #promoteAdmin': function(event) {
        event.preventDefault();
				var currFirst = Meteor.user().profile.firstName;
				var currLast = Meteor.user().profile.lastName;
				var currPhone = Meteor.user().profile.phone;
				Meteor.users.update({_id: Meteor.user()._id}, {$set: {
							profile: {isAdmin: true, firstName: currFirst, lastName: currLast, phone: currPhone}
						}
			 		}, function(error){
						if(error){
								alert(error.reason);
						} else {
								alert('You\'re an admin now!');
								Router.go("admin"); // Redirect user if registration succeeds
						}
				});
		}
	});
	
	Template.registerHelper('firstName', function() {
		return Meteor.user().profile.firstName;
	});
	
	Template.registerHelper('lastName', function(){
		return Meteor.user().profile.lastName;
	});
	
	Template.registerHelper('currPhone', function(){
		return Meteor.user().profile.phone;
	});
	
	Template.registerHelper('currFb', function(){
		return Meteor.user().profile.fb;
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
						profile: {firstName: firstVar, lastName: lastVar, phone: '', fb: ''},
						email: emailVar,
						password: passwordVar
				}, function(error){
						if(error){
								alert(error.reason);
						} else {
								console.log("Sending to dashboard");
								Router.go("dashboard"); // Redirect user if registration succeeds
								Modal.show('modal_welcome');
						}
				});
		}
	});
	
	Template.modal_welcome.events({
		'click #profileRedirect': function(event) {
			Modal.hide('welcome');
			Router.go("profile");
		}
		
	})
	
	Template.profile.events({
    'submit #updateUserForm': function(event) {
        event.preventDefault();
				console.log(event.target);
				var firstVar = event.target.firstName.value;
				var lastVar = event.target.lastName.value;
				var phone = event.target.phone.value;
				var currAdmin = Meteor.user().profile.isAdmin;
				Meteor.users.update({_id: Meteor.user()._id}, {$set: {
							profile: {firstName: firstVar, lastName: lastVar, phone: phone, isAdmin: currAdmin}
						}
			 		}, function(error){
						if(error){
								alert(error.reason);
						} else {
								Modal.show('modal_account_updated');
//								Router.go("dashboard"); // Redirect user if registration succeeds
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
						Modal.show('modal_crime_reported');
						Router.go("crimemap");
		}
	});
	
	AutoForm.addHooks(['alertForm'], {
		onSuccess: function (operation, result, template) {
						Modal.show('modal_alert_added');
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
	
	Accounts.onCreateUser(function(options, user) {
		user.firstName = options.firstName;
		user.lastName = options.lastName;
		user.isAdmin = options.isAdmin;
		if (options.profile) {
			user.profile = options.profile;
		}
		user.profile['isAdmin'] = false;
		return user;
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
        var fb_id = Meteor.users.findOne({id: id}).profile.fb;
        console.log("fb id: " + fb_id);
        api.sendMessage(message, fb_id);
      }));

      //Twilio
      var accountSid = 'AC53db7a939b89ebd3bd9646b5fd1bb9e4';
      var authToken = '8361eaec0af9fc521cbaa4e877bd0af5';
      var client = Meteor.npmRequire('twilio')(accountSid, authToken);

      //TODO: parse phone number to make sure it is ########## without () or -
      var phone = "+1" + Meteor.users.findOne({id: id}).profile.phone
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
    sendVerificationEmail: false,
    forbidClientAccountCreation: false
  });
}


