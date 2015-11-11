Subscribers = new Mongo.Collection("subscribers");

if (Meteor.isClient) {
  Session.setDefault('queries', '');
  Template.subscribers_overview.helpers({
    subscribers: function() {
      return Subscribers.find({});
    },
    queries: function() {
      return Session.get('queries');
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
      var id = event.target.text.value;
      Meteor.call('addSubscriber', id, function(err, res) {
        if(err) return console.error(err);
      });
      event.target.text.value = "";
    },
    'submit .search-user': function(event) {
      event.preventDefault();
      var name = event.target.text.value;
      Meteor.call('searchUser', name, function(err, res) {
        if(err) return console.error(err);
        console.log("Callback returned!");
        Session.set('queries', res);
        console.log(Session.get('queries'));
      });
      event.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });

  Meteor.methods({
    'sendMessage': function sendMessage(id,message) {
      var login = Meteor.npmRequire('facebook-chat-api');

      login({
        email: "adviz.bot@gmail.com",
        password: "smartvizag"
      }, function callback(err, api) {
        console.log("logging in now");
        if (err) return console.error(err);
        console.log("logged in!");
        //need to implement threadID for group chats
        api.sendMessage(message, id);
      });
    },
    'addSubscriber': function addSubscriber(id) {
      var login = Meteor.npmRequire('facebook-chat-api');
      login({email: "adviz.bot@gmail.com", password: "smartvizag"}, Meteor.bindEnvironment(function callback (err, api) {
          if(err) return console.error(err);

          api.getUserInfo(id, Meteor.bindEnvironment(function(err, ret) {
            if(err) return console.error(err);
            console.log(ret);
            console.log(ret[id]['name']);
            Subscribers.insert({
              id: Subscribers.find().count() + 1,
              fb_id: id,
              name: ret[id]['name'],
              gender: ret[id]['gender']
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
      }, function callback(err, api) {
        console.log("logging in now");
        if (err) return console.error(err);
        console.log("logged in!");

        api.getUserID(name, function(err, data) {
          if (err) return callback(err);
          console.log(data);
          return data;
        });
      });
    }
  });

}