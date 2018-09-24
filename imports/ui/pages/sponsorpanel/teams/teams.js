import './teams.html'

import { Teams } from '/imports/api/teams/teams.js';

Template.sp_teams.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teams.sponsor");
	});
})

Template.sp_teams.helpers({
	teams(){
		return Teams.find();
	},
	isWeb(team){
		return ( team.category == "Web");
	},
	/*
	username()
	{
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	email(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).emails[0].address;
	}
	*/
});

Template.sp_teams.events({
	
})
