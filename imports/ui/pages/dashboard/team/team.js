import './team.html';

import { Teams } from '/imports/api/teams/teams.js';

Template.dash_team.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teams.own");
	});
})

Template.dash_team_add.helpers({
	Teams(){
		return Teams;
	},
});

Template.dash_team_edit.helpers({
	Teams(){
		return Teams;
	},
	ownTeam(){
		// Returns only the team this is user is Captain of
		// Subscription already makes a bit of this confirmation
		return Teams.findOne({"captain":Meteor.userId()});
	},
});