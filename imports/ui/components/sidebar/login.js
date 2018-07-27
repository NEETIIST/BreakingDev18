import './login.html'

Template.login.helpers({
	userLogged()
	{
		return Meteor.userId();
	},
});