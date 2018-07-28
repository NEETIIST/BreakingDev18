import './dashboard.html';

import './overview/overview.js';
import './profile/profile.js';

Template.dashboard.onRendered(function(){
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
	"click #dash_overview": function(){
		FlowRouter.go("Dashboard");
	},

	"click #dash_profile": function(){
		FlowRouter.go("DevProfile");
	},
})