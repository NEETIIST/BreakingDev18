import './overview.html'

import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.dash_overview.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('users.team.own');
	})
})

Template.dash_overview.helpers({
	hasProfile(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev != undefined );
	},
	hasTeam(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		if ( dev != undefined )
			return ( dev.team != null );
		else
			return false;
	},
	dev(){
		return Devs.findOne({"user":Meteor.userId()});
	},
	username(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	username(id){
		return Meteor.users.findOne({"_id":id}).username;
	},
	team(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		if ( dev != undefined )
			return Teams.findOne({"_id":dev.team});
	}
});