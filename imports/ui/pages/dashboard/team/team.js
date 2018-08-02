import './team.html';

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';


Template.dash_team.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.own");
		self.subscribe("teams.own");
	});
});

// Team Manage
Template.dash_team_manage.helpers({
	hasTeam(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev.team != null )
	},
	isCaptain(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		let team = Teams.findOne({"_id":dev.team});
		if ( team != undefined )
			return ( team.captain == Meteor.userId() );
	},
});

Template.dash_team_manage.events({
	'click #dash-team-edit': function(){
		FlowRouter.go("DevTeamEdit")
	},
	'click #dash-team-add': function(){
		FlowRouter.go("DevTeamAdd")
	},
})


// Team Add
Template.dash_team_add.onRendered(function(){
	var self = this;
	self.autorun(function(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		if ( dev.team != null )
			FlowRouter.go("DevTeam");	
	})
	
});

Template.dash_team_add.helpers({
	Teams(){
		return Teams;
	},
});

AutoForm.addHooks(['addTeam'], {
    onSuccess: function(operation, result, template) {
    	FlowRouter.go("DevTeam");	
    	alert(TAPi18n.__('team-add-success'));
		//console.log(operation);
      	//console.log(result);
      	//console.log(template);
      	//console.log(Teams.findOne({"count":5}));
    },
   	onError: function(operation, error, template) {
     	console.log(error);
  	}
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

AutoForm.addHooks(['editTeam'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('team-edit-success'));
	}
});