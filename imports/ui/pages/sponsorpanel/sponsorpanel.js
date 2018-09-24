import './sponsorpanel.html';

import './overview/overview.js';
import './profile/profile.js';
import './company/company.js';
import './teams/teams.js';
import './devs/devs.js';

//import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.sponsorPanel.onRendered(function(){
	$("html").css({ "overflow-y":"scroll" });
	var self = this;
	self.autorun(function(){
		if ( Meteor.userId() )
		{
			if ( Roles.userIsInRole(Meteor.userId(), "nothing") )
			{
				FlowRouter.go("SignUpRoles");	
			}
			else if ( Roles.userIsInRole(Meteor.userId(), "staff") )
			{
				FlowRouter.go("AdminPanel");	
			}
			else if ( Roles.userIsInRole(Meteor.userId(), "sponsor") )
			{
				self.subscribe("sponsors.own");
				self.subscribe("companies.own");
			}
			else if ( Roles.userIsInRole(Meteor.userId(), "volunteer") )
			{
				FlowRouter.go("VolunteerPanel");
			}
			else if ( Roles.userIsInRole(Meteor.userId(), "dev") )
			{
				FlowRouter.go("Dashboard");
			}
		}
		else
			FlowRouter.go("Login");
	});
});


Template.sponsorPanel.helpers({
	isActiveMenu(opt){
		let active = Session.get("sp_activeMenu");
		//console.log(active);
		if ( "sp_"+opt == active )
			return "menu-active";
		else
			return "menu-hover";
	},
})

Template.sponsorPanel.events({
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
	
	"click #sp_overview": function(){
		FlowRouter.go("SponsorPanel");
	},

	"click #sp_profile": function(){
		FlowRouter.go("SponsorProfile");
	},

	"click #sp_company": function(){
		FlowRouter.go("SponsorCompany");
	},

	"click #sp_teams": function(){
		FlowRouter.go("SponsorTeams");
	},

	"click #sp_devs": function(){
		FlowRouter.go("SponsorDevs");
	},

	"click #sp_logout": function(){
		FlowRouter.go("Logout");
	},
})