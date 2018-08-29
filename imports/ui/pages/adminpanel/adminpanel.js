import './adminpanel.html';

import './overview/overview.js';
import './teams/teams.js';
import './devs/devs.js';
import './email/email.js';

Template.adminPanel.onRendered(function(){
	$("html").css({ "overflow-y":"scroll" });
	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole(Meteor.userId(), "staff") )
		{
			self.subscribe("users.all");
			self.subscribe("roles.all");
			self.subscribe("teams.all");
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
	
	"click #ap_overview": function(){
		FlowRouter.go("AdminPanel");
	},

	"click #ap_devs": function(){
		FlowRouter.go("AdminDevs");
	},

	"click #ap_teams": function(){
		FlowRouter.go("AdminTeams");
	},

	"click #ap_email": function(){
		FlowRouter.go("AdminEmail");
	},

	"click #ap_logout": function(){
		FlowRouter.go("Logout");
	},
})