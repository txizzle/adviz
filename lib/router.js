/* IronRouter routes */
Router.configure({
	loadingTemplate: 'loading'
});

Router.route('/', {
	template: 'index'
});

Router.route('/home');
Router.route('/admin');
Router.route('/index');
Router.route('/olddashboard');
Router.route('/oldcrimemap');

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
})

Router.route('/login');
Router.route('/register');
Router.route('/dashboard', function() {
	Session.set('dashPage', 'overview');
	this.render('dashboard');
});