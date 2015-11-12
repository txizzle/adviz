Subscribers = new Mongo.Collection("subscribers");
Queries = new Mongo.Collection("queries");

if (Meteor.isClient) {
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
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    //hacky way to clear searches
    Queries.remove({});
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
        from: "+17073982604",   
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

}