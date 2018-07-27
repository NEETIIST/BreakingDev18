import './adminpanel.html';

import './overview/overview.js';
import './teams/teams.js';

Template.adminPanel.onRendered(function(){
	BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
	Session.set("ap_activeMenu","ap_overview");

	var self = this;
	self.autorun(function(){
		/*
		if ( Roles.userIsInRole( Meteor.userId(), 'admin'))
		{
			self.subscribe("devs.all",Meteor.userId());
			self.subscribe("teams.all",Meteor.userId());
			self.subscribe("users.all", Meteor.userId());
			self.subscribe("alerts.all", Meteor.userId());
			self.subscribe("payments.all", Meteor.userId());
			self.subscribe("files.images.all", Meteor.userId());
			self.subscribe("volunteers.all", Meteor.userId());
			self.subscribe("shifts.all");
			self.subscribe("sponsors.all");
			self.subscribe("visitors.all");
			self.subscribe("wallet.all");
			self.subscribe("products.all");
			Session.set("focus", null);
			Session.set("codesToDisplay", true);
		}
		else
		{
			FlowRouter.go("/dash");
		}
		*/
		self.subscribe("users.all");
		self.subscribe("roles.all");
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