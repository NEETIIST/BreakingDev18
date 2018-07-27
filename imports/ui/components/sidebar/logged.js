import './logged.html'

Template.logged.helpers({
	userLogged()
	{
		return Meteor.userId();
	},
	username(){
		if ( Meteor.userId() )
			return Meteor.user().username;
	},
});

Template.logged.events({
	'click #goDashboard': function(){
		FlowRouter.go("Dashboard");
	},
	'click #menu-login': function(){
		FlowRouter.go("Login");
	},
	'click #menu-signup': function(){
		FlowRouter.go("SignUp");
	},
});