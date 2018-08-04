import './dev.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.dev_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var username = FlowRouter.getParam('username');
		self.subscribe('users.username', username);
		self.subscribe('devs.username.visitor', username);
		self.subscribe('teams.visitor.username', username);
	});
	window.scrollTo(0,0);
});

Template.dev_profile.helpers({
	dev(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return Devs.findOne({"user":userId});
	},
	username(){
		return FlowRouter.getParam('username');
	},
	hasTeam(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return ( Devs.findOne({"user":userId}).team != null );
	},
	team(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		if ( Devs.findOne({"user":userId}).team != null )
			return Teams.findOne();
	}
});

Template.dev_profile.events({
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