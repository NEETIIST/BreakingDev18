import './adminpanel.html';

import './overview/overview.js';
import './teams/teams.js';

Template.adminPanel.onRendered(function(){
	BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
	Session.set("ap_activeMenu","ap_overview");
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