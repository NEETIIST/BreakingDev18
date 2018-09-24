import './dashboard.html';

import './overview/overview.js';
import './profile/profile.js';
import './team/team.js';

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.dashboard.onRendered(function(){
	$("html").css({ "overflow-y":"scroll" });
	var self = this;
	self.autorun(function(){
		if ( Meteor.userId() )
		{
			if ( Roles.userIsInRole(Meteor.userId(), "nothing") )
			{
				//console.log("here");
				FlowRouter.go("SignUpRoles");	
			}
			else if ( Roles.userIsInRole(Meteor.userId(), "staff") )
			{
				FlowRouter.go("AdminPanel");	
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
				self.subscribe("devs.own");
				self.subscribe("teams.own");
			}
		}
		else
			FlowRouter.go("Login");
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
	userHasProfile(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev != undefined );
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
		closeMenu();
	},
	
	"click #dash_overview": function(){
		FlowRouter.go("Dashboard");
		closeMenu();
	},

	"click #dash_profile": function(){
		FlowRouter.go("DevProfile");
		closeMenu();
	},

	"click #dash_team": function(){
		FlowRouter.go("DevTeam");
		closeMenu();
	},

	"click #dash_logout": function(){
		FlowRouter.go("Logout");
	},
});

function closeMenu()
{
	// Close Mobile
	if ( $(window)[0].outerWidth < 768)
	{
		$("#close-menu").hide("fade", 200, function(){
			$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
				$("#open-menu").show("fade",200, function(){
					$('html, body').animate({
			        	scrollTop: $("#landing-"+newopt).offset().top + dir
			    	}, 1000);
				});
			});
		});
	}
}