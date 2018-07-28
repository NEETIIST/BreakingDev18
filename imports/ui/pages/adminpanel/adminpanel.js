import './adminpanel.html';

import './overview/overview.js';
import './teams/teams.js';

Template.adminPanel.onRendered(function(){
	var self = this;
	self.autorun(function(){
		console.log("here");
		console.log(Roles.userIsInRole(Meteor.userId(), "staff"));
		if ( Roles.userIsInRole(Meteor.userId(), "staff") )
		{
			self.subscribe("users.all");
			self.subscribe("roles.all");
			BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
			Session.set("ap_activeMenu","ap_overview");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "sponsor") )
		{
			FlowRouter.go("SponsorPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "volunteer") )
		{
			FlowRouter.go("VolunteerPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "dev") )
		{
			FlowRouter.go("Dashboard");
		}
	});
})

Template.adminPanel.helpers({
	isActiveMenu(opt){
		let active = Session.get("ap_activeMenu");
		if ( "ap_"+opt == active )
			return "menu-active";
		else
			return "menu-hover";
	},
})

Template.adminPanel.events({
	"click #ap_overview": function(){
		BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
		Session.set("ap_activeMenu","ap_overview");
	},

	"click #ap_teams": function(){
		BlazeLayout.render('adminPanel', {ap_content:"ap_teams"});
		Session.set("ap_activeMenu","ap_teams");
	},
})