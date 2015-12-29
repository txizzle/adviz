Subscribers = new Mongo.Collection("subscribers");
Queries = new Mongo.Collection("queries");
Crimes = new Mongo.Collection("crimes");
Crimes.attachSchema(new SimpleSchema({
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
}));

Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  }
}));