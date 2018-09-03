import './logged.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.logged.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.own");
		self.subscribe("teams.own");
	});
});

Template.logged.helpers({
	userLogged()
	{
		return Meteor.userId();
	},
	username(){
		if ( Meteor.userId() )
			return Meteor.user().username;
	},
	isDev(){
		return ( Roles.userIsInRole(Meteor.userId(), "dev"));
	},
	isStaff(){
		return ( Roles.userIsInRole(Meteor.userId(), "staff"));
	},
	isVolunteer(){
		return ( Roles.userIsInRole(Meteor.userId(), "volunteer"));
	},
	volunteer(){
		return Volunteers.findOne({"user":Meteor.userId()});
	},
	hasTeam(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev.team != null );
	},
	team(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		if ( dev.team != null )
			return Teams.findOne({"_id":dev.team});
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