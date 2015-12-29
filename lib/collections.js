Subscribers = new Mongo.Collection("subscribers");
Queries = new Mongo.Collection("queries");
Crimes = new Mongo.Collection("crimes");

Schema = {};

Schema.Crime = new SimpleSchema({
	category: {
		type: String,
		label: "Crime Category",
		allowedValues: ['robbery', 'rape', 'murder', 'assault', 'abduction', 'arson', 'theft'],
		autoform: {
			type: "select",
			options: function() {
				return [
					{label: "Robbery", value: 'robbery'},
					{label: "Rape", value: 'rape'},
					{label: "Murder", value: 'murder'},
					{label: "Assault", value: 'assault'},
					{label: "Abduction", value: 'abduction'},
					{label: "Arson", value: 'arson'},
					{label: "Theft", value: 'theft'}
				];
			}
		}
	},
	desc: {
		type: String,
		label: "Description"
	},
	time: {
		type: Date,
		label: "Time",
		autoform: {
			afFieldInput: {
				type: "bootstrap-datetimepicker"
			}
		}
	},
	location: {
		type: Object,
		autoform: {
			type: 'map',
			afFieldInput: {
				geolocation: true,
				searchBox: true,
				autolocate: false,
				zoom: 12,
				height: '300px',
				defaultLat: '17.6886',
				defaultLng: '83.2189'
			}
		}
	},
	'location.lat': {
		type: Number,
		decimal: true
	},
	'location.lng': {
		type: Number,
		decimal: true
	}
});

Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
		}
});

Schema.User = new SimpleSchema({
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
		},
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});
Meteor.users.attachSchema(Schema.User);
Crimes.attachSchema(Schema.Crime);