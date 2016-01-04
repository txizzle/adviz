/* IronRouter routes */
Router.configure({
	loadingTemplate: 'loading'
});

Router.route('/', {
	template: 'index'
});

Router.route('/home');
Router.route('/index');
Router.route('/olddashboard');
Router.route('/oldcrimemap');
Router.route('/oldadmin');

Router.route('/crimemap', function() {
	Session.set('dashPage', 'map');
	this.render('crime_map');
});

Router.route('/trends', function() {
	Session.set('dashPage', 'trends');
	this.render('trends');
});


Router.route('/reportcrime', function() {
	Session.set('dashPage', 'report');
	this.render('report_crime');
});

Router.route('/question', function() {
	Session.set('dashPage', 'question');
	this.render('question');
});

Router.route('/alerts', function() {
	Session.set('dashPage', 'alerts');
	this.render('past_alerts');
});

Router.route('/profile', function() {
	Session.set('dashPage', 'profile');
	this.render('profile');
});

Router.route('/admin', function() {
	Session.set('dashPage', 'admin');
	this.render('admin');
});

Router.route('/login');
Router.route('/register');
Router.route('/dashboard', function() {
	Session.set('dashPage', 'overview');
	this.render('dashboard');
});

//Meteor.Router.add('/api/twiml/sms', 'POST', function() {
//    var rawIn = this.request.body;
//    if (Object.prototype.toString.call(rawIn) == "[object Object]") {
//        twilioRawIn.insert(rawIn);
//    }
//
//    var question = {};
//    if (rawIn.Body) {
//        question.inputQuestion = rawIn.Body;
//        question.source = "sms";
//    } else if (rawIn.TranscriptionText) {
//        question.inputQuestion = rawIn.TranscriptionText;
//        question.source = "voicemail";
//    } else {
//        return;
//    }
//    question.inputName = rawIn.From;
//
//    var toOrig = rawIn.To;
//    toOrig = toOrig.replace(/\+1/g, "");
//    var toPretty = '('+toOrig.substr(0,3)+') '+toOrig.substr(3,3)+'-'+toOrig.substr(6,10);
//    var eventDetails = Events.findOne({phone: toPretty});
//
//    if (_.size(eventDetails) == 0) {
//        return;
//    } else {
//        question.slug = eventDetails.slug;
//    }
//
////    Meteor.call('questionCreate', question, function(error, res) {
////
////    });
//
//    var xml = '<Response><Sms>Thank you for submitting your question!</Sms></Response>';
//    return [200, {"Content-Type": "text/xml"}, xml];
//});