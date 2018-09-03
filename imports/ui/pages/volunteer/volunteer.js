import './volunteer.html'

import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.volunteer_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var username = FlowRouter.getParam('username');
		self.subscribe('users.username', username);
		self.subscribe('volunteers.username.visitor', username);
		if ( Roles.userIsInRole(Meteor.userId(), "staff") )
			self.subscribe('volunteers.username.admin', username);
	});
	window.scrollTo(0,0);
});

Template.volunteer_profile.helpers({
	volunteer(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return Volunteers.findOne({"user":userId});
	},
	username(){
		return FlowRouter.getParam('username');
	},
	/*
	hasTeam(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return ( Devs.findOne({"user":userId}).team != null );
	},
	team(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		if ( Devs.findOne({"user":userId}).team != null )
			return Teams.findOne();
	},
	*/
	adminInfo(){
		return ( Roles.userIsInRole(Meteor.userId(), "staff") )
	},
	email(){
		if (Roles.userIsInRole( Meteor.userId(), 'staff'))
			return Meteor.users.findOne({"username":FlowRouter.getParam('username')}).emails[0].address;
	},
});

Template.volunteer_profile.events({
	'click #open-menu': function(){
		$("#open-menu").hide("fade", 200, function(){
			$("#menu-col").show("slide", {direction:"right"}, 1000, function(){
				$("#close-menu").show("fade",200);
			});
		});
	},

	'click #close-menu': function(){
		$("#close-menu").hide("fade", 200, function(){
			$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
				$("#open-menu").show("fade",200);
			});
		});
	},

	'click #menu-goindex': function() {
		FlowRouter.go("Index");
	},
})