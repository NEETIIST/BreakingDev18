import './teams.html';

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.ap_teams.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teams.all");
	})
});

Template.ap_teams.helpers({
	team() {
		return Teams.find({"abandoned":false});
	},
	isWeb(team){
		return ( team.category == "Web");
	},
	date(){
		return moment(this.date).format("Do MMM YY");
	}
});

Template.ap_teams.events({
	'click #validate-team': function(){
		Meteor.call("validateTeam", this.number, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-teams-validate-success'));
	        }
		});
	},

	'click #unvalidate-team': function(){
		Meteor.call("unvalidateTeam", this.number, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-teams-unvalidate-success'));
	        }
		});
	},
})