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
	
	UI.registerHelper("getImageUser", function (userId) {
    var user= Meteor.user();
		var url = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=normal";
		return url;
	});
	
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
	
	Template.registerHelper('noFB', function(input) {
		console.log(!Meteor.user().services.facebook);
		return !Meteor.user().services.facebook;
	});
	
	Template.registerHelper('noTwitter', function(input) {
		return !Meteor.user().services.twitter;
	});
	
	Template.registerHelper('noPhone', function(input) {
		return !Meteor.user().profile.phone;
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
				new google.maps.LatLng(17.70491, 83.30465),
				new google.maps.LatLng(17.70647, 83.30117),
				new google.maps.LatLng(17.706, 83.30838),
				new google.maps.LatLng(17.7431, 83.3388),
				new google.maps.LatLng(17.706, 83.30385),
				new google.maps.LatLng(17.76106, 83.21578),
				new google.maps.LatLng(17.81185, 83.36595),
				new google.maps.LatLng(17.7146, 83.29423),
				new google.maps.LatLng(17.75722, 83.21527),
				new google.maps.LatLng(17.70694, 83.20361),
				new google.maps.LatLng(17.5375, 83.25361),
				new google.maps.LatLng(17.91527, 83.54888),
				new google.maps.LatLng(17.74441, 83.30891),
				new google.maps.LatLng(17.72024, 83.28601),
				new google.maps.LatLng(17.73403, 83.31743),
				new google.maps.LatLng(17.74196, 83.26129),
				new google.maps.LatLng(17.76565, 83.35727),
				new google.maps.LatLng(17.72709, 83.33741),
				new google.maps.LatLng(17.73553, 83.28917),
				new google.maps.LatLng(17.75116, 83.24866),
				new google.maps.LatLng(17.70557, 83.08488),
				new google.maps.LatLng(17.8155, 83.20506),
				new google.maps.LatLng(17.73344, 83.32081),
				new google.maps.LatLng(17.73981, 83.30773),
				new google.maps.LatLng(17.73402, 83.30559),
				new google.maps.LatLng(17.68991, 83.22684),
				new google.maps.LatLng(17.7835, 83.19947),
				new google.maps.LatLng(17.80934, 83.20878),
				new google.maps.LatLng(17.78258, 83.21315),
				new google.maps.LatLng(17.74329, 83.31305),
				new google.maps.LatLng(17.76213, 83.22064),
				new google.maps.LatLng(17.69146, 83.13584),
				new google.maps.LatLng(17.56995, 83.09056),
				new google.maps.LatLng(17.7969, 83.20803),
				new google.maps.LatLng(17.75694, 83.35416),
				new google.maps.LatLng(17.54027, 83.20972),
				new google.maps.LatLng(17.74875, 83.24628),
				new google.maps.LatLng(17.72581, 83.31132),
				new google.maps.LatLng(17.72923, 83.34342),
				new google.maps.LatLng(17.73564, 83.27639),
				new google.maps.LatLng(17.7774, 83.21503),
				new google.maps.LatLng(17.82153, 83.35103),
				new google.maps.LatLng(17.68486, 83.23296),
				new google.maps.LatLng(17.91827, 83.42489),
				new google.maps.LatLng(17.7285, 83.29874),
				new google.maps.LatLng(17.93169, 83.40153),
				new google.maps.LatLng(17.7629, 83.33853),
				new google.maps.LatLng(17.68682, 83.14227),
				new google.maps.LatLng(17.77773, 83.22409),
				new google.maps.LatLng(17.76249, 83.33142),
				new google.maps.LatLng(17.73981, 83.30004),
				new google.maps.LatLng(17.68451, 83.1372),
				new google.maps.LatLng(17.82087, 83.21038),
				new google.maps.LatLng(17.70711, 83.30731),
				new google.maps.LatLng(17.68683, 83.16837),
				new google.maps.LatLng(17.9225, 83.41463),
				new google.maps.LatLng(17.80726, 83.34006),
				new google.maps.LatLng(17.82022, 83.36197),
				new google.maps.LatLng(17.79879, 83.36736),
				new google.maps.LatLng(17.75409, 83.3454),
				new google.maps.LatLng(17.72796, 83.30494),
				new google.maps.LatLng(17.6893, 83.20504),
				new google.maps.LatLng(17.53765, 83.08531),
				new google.maps.LatLng(17.78296, 83.3584),
				new google.maps.LatLng(17.8197, 83.35691),
				new google.maps.LatLng(17.79884, 83.21494),
				new google.maps.LatLng(17.70055, 83.17967),
				new google.maps.LatLng(17.72768, 83.29372),
				new google.maps.LatLng(17.69217, 83.19077),
				new google.maps.LatLng(17.69147, 83.17264),
				new google.maps.LatLng(17.73737, 83.22617),
				new google.maps.LatLng(17.81225, 83.37426),
				new google.maps.LatLng(17.73339, 83.27648),
				new google.maps.LatLng(17.73737, 83.22617),
				new google.maps.LatLng(17.89568, 83.38029),
				new google.maps.LatLng(17.80685, 83.35956),
				new google.maps.LatLng(17.70477, 83.30589),
				new google.maps.LatLng(17.7818, 83.35868),
				new google.maps.LatLng(17.73864, 83.29992),
				new google.maps.LatLng(17.71105, 83.30027),
				new google.maps.LatLng(17.73024, 83.30373),
				new google.maps.LatLng(17.74678, 83.24705),
				new google.maps.LatLng(17.73449, 83.31261),
				new google.maps.LatLng(17.71645, 83.30493),
				new google.maps.LatLng(17.73532, 83.26715),
				new google.maps.LatLng(17.7373, 83.29987),
				new google.maps.LatLng(17.746, 83.26404),
				new google.maps.LatLng(17.90568, 83.39952),
				new google.maps.LatLng(17.72752, 83.30913),
				new google.maps.LatLng(17.68557, 83.24429),
				new google.maps.LatLng(17.9068, 83.38415),
				new google.maps.LatLng(17.70498, 83.29429),
				new google.maps.LatLng(17.70647, 83.30791),
				new google.maps.LatLng(17.72754, 83.29849),
				new google.maps.LatLng(17.81165, 83.35297),
				new google.maps.LatLng(17.73483, 83.30103),
				new google.maps.LatLng(17.82138, 83.20547),
				new google.maps.LatLng(17.8159, 83.34045),
				new google.maps.LatLng(17.53801, 83.08635),
				new google.maps.LatLng(17.67736, 83.1906),
				new google.maps.LatLng(17.72094, 83.33156),
				new google.maps.LatLng(17.81167, 83.35834),
				new google.maps.LatLng(17.72094, 83.33156),
				new google.maps.LatLng(17.73517, 83.27793),
				new google.maps.LatLng(17.68458, 83.212),
				new google.maps.LatLng(17.71601, 83.30673),
				new google.maps.LatLng(17.72742, 83.33781),
				new google.maps.LatLng(17.75971, 83.32126),
				new google.maps.LatLng(17.73096, 83.29893),
				new google.maps.LatLng(17.73654, 83.31012),
				new google.maps.LatLng(17.74562, 83.21469),
				new google.maps.LatLng(17.73851, 83.21902),
				new google.maps.LatLng(17.7177, 83.31901),
				new google.maps.LatLng(17.68701, 83.21873),
				new google.maps.LatLng(17.81061, 83.35881),
				new google.maps.LatLng(17.69244, 83.16777),
				new google.maps.LatLng(17.90018, 83.37422),
				new google.maps.LatLng(17.71001, 83.29471),
				new google.maps.LatLng(17.89381, 83.4476),
				new google.maps.LatLng(17.74049, 83.21755),
				new google.maps.LatLng(17.80887, 83.19953),
				new google.maps.LatLng(17.9049, 83.43704),
				new google.maps.LatLng(17.74409, 83.23113),
				new google.maps.LatLng(17.6821, 83.14285),
				new google.maps.LatLng(17.74715, 83.22314),
				new google.maps.LatLng(17.68461, 83.21637),
				new google.maps.LatLng(17.7089, 83.29659),
				new google.maps.LatLng(17.74053, 83.31701),
				new google.maps.LatLng(17.74038, 83.31739),
				new google.maps.LatLng(17.7143, 83.30093),
				new google.maps.LatLng(17.72057, 83.30085),
				new google.maps.LatLng(17.73947, 83.31514),
				new google.maps.LatLng(17.71694, 83.1956),
				new google.maps.LatLng(17.74286, 83.3088),
				new google.maps.LatLng(17.74196, 83.27101),
				new google.maps.LatLng(17.72144, 83.3176),
				new google.maps.LatLng(17.80083, 83.22262),
				new google.maps.LatLng(17.68786, 83.21217),
				new google.maps.LatLng(17.68629, 83.18302),
				new google.maps.LatLng(17.68605, 83.18252),
				new google.maps.LatLng(17.68871, 83.23413),
				new google.maps.LatLng(17.68046, 83.18941),
				new google.maps.LatLng(17.89038, 83.45145),
				new google.maps.LatLng(17.931, 83.42619),
				new google.maps.LatLng(17.74541, 83.33587),
				new google.maps.LatLng(17.80457, 83.35971),
				new google.maps.LatLng(17.69228, 83.15407),
				new google.maps.LatLng(17.68509, 83.18409),
				new google.maps.LatLng(17.76426, 83.31839),
				new google.maps.LatLng(17.761, 83.30934),
				new google.maps.LatLng(17.74278, 83.30595),
				new google.maps.LatLng(17.76725, 83.3214),
				new google.maps.LatLng(17.77753, 83.22707),
				new google.maps.LatLng(17.76723, 83.32245),
				new google.maps.LatLng(17.74028, 83.26614),
				new google.maps.LatLng(17.78784, 83.19417),
				new google.maps.LatLng(17.82632, 83.24942),
				new google.maps.LatLng(17.68596, 83.13625),
				new google.maps.LatLng(17.76611, 83.32204),
				new google.maps.LatLng(17.74603, 83.32054),
				new google.maps.LatLng(17.82123, 83.35575),
				new google.maps.LatLng(17.80584, 83.35905),
				new google.maps.LatLng(17.74646, 83.32018),
				new google.maps.LatLng(17.74366, 83.28391),
				new google.maps.LatLng(17.68495, 83.13707),
				new google.maps.LatLng(17.74214, 83.25064),
				new google.maps.LatLng(17.76611, 83.32204),
				new google.maps.LatLng(17.75446, 83.33597),
				new google.maps.LatLng(17.79737, 83.21611),
				new google.maps.LatLng(17.68468, 83.13291),
				new google.maps.LatLng(17.71709, 83.32008),
				new google.maps.LatLng(17.76759, 83.31763),
				new google.maps.LatLng(17.73495, 83.28882),
				new google.maps.LatLng(17.73503, 83.28955),
				new google.maps.LatLng(17.68806, 83.1345),
				new google.maps.LatLng(17.73397, 83.27639),
				new google.maps.LatLng(17.73363, 83.33875),
				new google.maps.LatLng(17.69175, 83.15457),
				new google.maps.LatLng(17.68789, 83.23356),
				new google.maps.LatLng(17.75571, 83.22001),
				new google.maps.LatLng(17.79788, 83.21059),
				new google.maps.LatLng(17.75058, 83.34877),
				new google.maps.LatLng(17.72069, 83.33535),
				new google.maps.LatLng(17.74397, 83.33287),
				new google.maps.LatLng(17.81528, 83.34255),
				new google.maps.LatLng(17.76546, 83.32708),
				new google.maps.LatLng(17.74117, 83.27135),
				new google.maps.LatLng(17.68742, 83.16446),
				new google.maps.LatLng(17.7173, 83.30601),
				new google.maps.LatLng(17.72552, 83.30658),
				new google.maps.LatLng(17.682, 83.20131)
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
	
	Template.registerHelper('currFirstName', function() {
		return Meteor.user().profile.firstName;
	});
	
	Template.registerHelper('currLastName', function(){
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
		},
		'click #connectWithFb': function(event) {
        Meteor.linkWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
		'click #connectWithTwitter': function(event) {
        Meteor.linkWithTwitter({}, function(err){
            if (err) {
                throw new Meteor.Error("Twitter login failed");
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
	
	AutoForm.addHooks(['messageForm'], {
		onSuccess: function (operation, result, template) {
						Modal.show('modal_message_sent');
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
	
	
	ServiceConfiguration.configurations.remove({
    service: 'facebook'
	});
 
	ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '165746407121566',
    secret: '55829ed26d05838360d7be86b3b19a88'
	});
	
	ServiceConfiguration.configurations.remove({
		service: "twitter"
	});
	ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "1LokFin3s2GqYyWFpyvONfkml",
		secret: "zKaeNP6PBIRYsa15zzyAxGCYSG0sOOKDs4WlmzhUQnpwpRjNBA"
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