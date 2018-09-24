import './logged.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Companies } from '/imports/api/companies/companies.js';

Template.logged.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.own");
		self.subscribe("teams.own");
		self.subscribe("companies.own");
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
	isSponsor(){
		return ( Roles.userIsInRole(Meteor.userId(), "sponsor"));
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
	company(){
		let company = Companies.findOne({"members":Meteor.userId()});
		if ( company != undefined )
			return company.short;
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