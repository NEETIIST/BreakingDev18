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

Template.dash_team.helpers({
	userHasProfile(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev != undefined );
	},
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
	onlyMember(){
		//console.log("here");
		let dev = Devs.findOne({"user":Meteor.userId()});
		let team = Teams.findOne({"_id":dev.team});
		//console.log(team);
		if ( team != undefined )
			return ( team.members.length == 0 );
	},
	team(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return Teams.findOne({"_id":dev.team});
	},
	isWeb(team){
		return ( team.category == "Web");
	},
});

Template.dash_team_manage.events({
	'click #dash-team-edit': function(){
		FlowRouter.go("DevTeamEdit")
	},
	'click #dash-team-add': function(){
		FlowRouter.go("DevTeamAdd")
	},
	'click #dash-team-invite': function(){
		FlowRouter.go("DevTeamInvite")
	},
	'click #dash-team-join': function(){
		FlowRouter.go("DevTeamJoin")
	},
	'click #dash-team-find': function(){
		FlowRouter.go("DevTeamFind")
	},
	'click #dash-team-delete': function(){
		if ( confirm(TAPi18n.__('dash-team-delete-confirm')) )
		{
			Meteor.call("disableTeam", function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                alert(TAPi18n.__('dash-team-delete-success'));
	            }
        	});
		}
	},
	'click #dash-team-leave': function(){
		if ( confirm(TAPi18n.__('dash-team-leave-confirm')) )
		{
			Meteor.call("leaveTeam", function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                alert(TAPi18n.__('dash-team-leave-success'));
	            }
        	});
		}
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
    	alert(TAPi18n.__('dash-team-add-success'));
    	FlowRouter.go("DevTeam");	
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
		alert(TAPi18n.__('dash-team-edit-success'));
		FlowRouter.go("DevTeam");
	}
});

// Team Invite
Template.dash_team_invite.helpers({
	ownTeam(){
		return Teams.findOne({"captain":Meteor.userId()});
	},
	password(){
		return Teams.findOne({"captain":Meteor.userId()}).password;
	},
});

Template.dash_team_invite.events({
	'submit #dash-team-invite': function(event) {
	    // Prevent default browser form submit

	    event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const email = target.mail.value;
	 
	    // Meteor Call Processing
	    Meteor.call("inviteToOwnTeam", email, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                alert(TAPi18n.__('dash-team-invite-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	 
	    // Clear form
	    target.mail.value = '';
	},
});

// Team Join
Template.dash_team_join.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var id = parseInt(FlowRouter.getParam('number'));
		//console.log(id);
		if ( id != undefined )
		{
			self.subscribe("teams.visitor",id);
			var team = Teams.findOne({"number":id});
			//console.log(team);
		}
		if ( Devs.findOne({"user":Meteor.userId()}).team != null )
			FlowRouter.go("DevTeam");
	})
	//var team = FlowRouter.getParam('team');
	//console.log(team);
});

Template.dash_team_join.helpers({
	hasTeamParam(){
		var team = parseInt(FlowRouter.getParam('number'));
		return ( ! Number.isNaN(team) );
	},
	team(){
		var team = parseInt(FlowRouter.getParam('number'));
		//console.log(Teams.findOne({"number":team}));
		return Teams.findOne({"number":team});
	},
	isWeb(team){
		//console.log(team);
		return ( team.category == "Web");
	},
});

Template.dash_team_join.events({
	'submit #dash-team-join-password': function(event) {
	    // Prevent default browser form submit
	    event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const pass = target.pass.value;
	 
	    // Meteor Call Processing
	    Meteor.call("joinTeam", pass, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                alert(TAPi18n.__('dash-team-join-success'));
                FlowRouter.go("DevTeam");
            }
    	});
	 
	    // Clear form
	    target.pass.value = '';
	},
})

// Team Find
Template.dash_team_find.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teams.available");
	});
});

Template.dash_team_find.helpers({
	availableTeam: function(){
		return Teams.find();
	},
	isWeb(team){
		return ( team.category == "Web");
	},
});

Template.dash_team_find.events({
	'click #dash-team-find-request': function(e, tmp){
		//prompt("")
		console.log(this);
	},
});