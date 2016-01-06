Template.admin.helpers({
	totalCrimes: function() {
		return Crimes.find({}).count() + 15;
	},
	percentUserSubmitted: function() {
		return Math.round(Crimes.find({}).count()/(Crimes.find({}).count() + 15)*100);
	},
	totalUsers: function() {
		return Meteor.users.find({}).count();
	}
});