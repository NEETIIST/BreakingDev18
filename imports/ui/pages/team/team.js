import './team.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.team_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('teams.visitor', number);
		self.subscribe('users.team', number);
	});
	window.scrollTo(0,0);
});

Template.team_profile.helpers({
	team(){
		return Teams.findOne();
	},
	isWeb(team){
		return ( team.category == "Web");
	},
	captain(){
		let team = Teams.findOne();
		return Meteor.users.findOne({"_id":team.captain});
	},
	member(){
		let team = Teams.findOne();
		return Meteor.users.find({"_id":{$in:team.members}});
	}

});

Template.team_profile.events({
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