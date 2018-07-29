import './dashboard.html';

import './overview/overview.js';
import './profile/profile.js';
import './team/team.js';

Template.dashboard.onRendered(function(){
	$("html").css({ "overflow-y":"scroll" });
	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole(Meteor.userId(), "staff") )
		{
			FlowRouter.go("dashboard");	
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
			//self.subscribe("users.all");
			//self.subscribe("roles.all");
			
		}
	});
});


Template.dashboard.helpers({
	isActiveMenu(opt){
		let active = Session.get("dash_activeMenu");
		//console.log(active);
		if ( "dash_"+opt == active )
			return "menu-active";
		else
			return "menu-hover";
	},
})

Template.dashboard.events({
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
	
	"click #dash_overview": function(){
		FlowRouter.go("Dashboard");
	},

	"click #dash_profile": function(){
		FlowRouter.go("DevProfile");
	},

	"click #dash_team": function(){
		FlowRouter.go("DevTeam");
	},

	"click #dash_logout": function(){
		FlowRouter.go("Logout");
	},
})