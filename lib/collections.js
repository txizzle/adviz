Subscribers = new Mongo.Collection("subscribers");
Queries = new Mongo.Collection("queries");
Crimes = new Mongo.Collection("crimes");
Alerts = new Mongo.Collection("alerts");
Messages = new Mongo.Collection("messages");

Schema = {};
Schema.Alert = new SimpleSchema({
	start: {
		type: String,
		autoform: {
			afFieldInput: {
				type: "time"
			}
		}
	},
	end: {
		type: String,
		autoform: {
			afFieldInput: {
				type: "time"
			}
		}
	},
	categories: {
		type: [String],
		autoform: {
			type: "select-checkbox-inline",
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
	channels: {
		type: [String],
		autoform: {
			type: "select-checkbox-inline",
			options: function() {
				return [
					{label: "Facebook", value: 'facebook'},
					{label: "SMS", value: 'sms'},
					{label: "Twitter", value: 'twitter'},
					{label: "Email", value: 'email'}
				]
			}
		}
	}
});

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
		phone: {
			type: String,
			optional: true
		},
		fb: {
			type: String,
			optional: true
		},
		isAdmin: {
			type: Boolean
		}
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
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
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

RangeSchema = new SimpleSchema({
  lower: {
    type: Number
  },
  upper: {
    type: Number
  }
});

AgeRangeSchema = new SimpleSchema({
  slider: {
    type: RangeSchema,
    max: 100,
    min: 0,
    autoform: {
      type: "noUiSlider",
      noUiSliderOptions: {
        step: 1
      },      
      noUiSlider_pipsOptions: {
        mode: 'count',
        values: 10,
				density: 10
      }
    }
  }
});

Schema.Message = new SimpleSchema({
	message: {
			type: String
	},
	recipientsGeo: {
			type: [String],
			autoform: {
				type: "select-checkbox-inline",
				options: function() {
					return [
						{label: "All", value: 'all'},
						{label: "Ward A", value: 'wardA'},
						{label: "Ward B", value: 'wardB'},
						{label: "Ward C", value: 'wardC'}
					]
				}
		}
	},
	recipientsGender: {
			type: String,
			autoform: {
				type: "select-radio-inline",
				options: function() {
					return [
						{label: "Both", value: 'both'},
						{label: "Male", value: 'male'},
						{label: "Female", value: 'female'}
					]
				}
		}
	},
	recipientsAge: {
			type: AgeRangeSchema
	},
	channels: {
		type: [String],
		autoform: {
			type: "select-checkbox-inline",
			options: function() {
				return [
					{label: "Facebook", value: 'facebook'},
					{label: "SMS", value: 'sms'},
					{label: "Twitter", value: 'twitter'},
					{label: "Email", value: 'email'}
				]
			}
		}
	}
});

Meteor.users.attachSchema(Schema.User);
Alerts.attachSchema(Schema.Alert);
Crimes.attachSchema(Schema.Crime);
Messages.attachSchema(Schema.Message);