import './sponsor.html';

import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Companies } from '/imports/api/companies/companies.js';

Template.sponsor_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var username = FlowRouter.getParam('username');
		self.subscribe("users.username", username);
		self.subscribe("sponsors.visitor", username);
		self.subscribe("companies.username", username);
	});
	window.scrollTo(0,0);
});

Template.sponsor_profile.helpers({
	sponsor(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return Sponsors.findOne({"user":userId});
	},
	username()
	{
		return FlowRouter.getParam('username');
	},
	companyName(id)
	{
		return Companies.findOne({"_id":id}).name;
	},
	companyShort(id)
	{
		return Companies.findOne({"_id":id}).short;
	},
});

Template.sponsor_profile.events({
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
});