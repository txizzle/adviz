Template.question.events({
    'click .sendmessage': function (e) {
			Session.set('unsent', false);
    }
  });