import './volunteerpanel.html';

import './overview/overview.js';
import './profile/profile.js';

Template.volunteerPanel.onRendered(function(){
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
		}
		else
			FlowRouter.go("Login");
	});
});


Template.volunteerPanel.helpers({
	isActiveMenu(opt){
		let active = Session.get("vp_activeMenu");
		//console.log(active);
		if ( "vp_"+opt == active )
			return "menu-active";
		else
			return "menu-hover";
	},
	/*
	userHasProfile(){
		let dev = Devs.findOne({"user":Meteor.userId()});
		return ( dev != undefined );
	},
	*/
})

Template.volunteerPanel.events({
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
	
	"click #vp_overview": function(){
		FlowRouter.go("VolunteerPanel");
	},

	"click #vp_profile": function(){
		FlowRouter.go("VolunteerProfile");
	},

	/*
	"click #vp_team": function(){
		FlowRouter.go("DevTeam");
	},
	*/

	"click #vp_logout": function(){
		FlowRouter.go("Logout");
	},
})