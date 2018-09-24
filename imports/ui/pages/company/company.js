import './company.html'

import { Companies } from '/imports/api/companies/companies.js';
import { Images } from '/imports/api/images/images.js';

Template.company_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var short = FlowRouter.getParam('short');
		self.subscribe('companies.visitor', short);
		self.subscribe('files.images.all');
		self.subscribe('users.company', short);
	});
	window.scrollTo(0,0);
});

Template.company_profile.helpers({
	company(){
		return Companies.findOne({"short":FlowRouter.getParam('short')});
	},
	getImage(img)
	{
		return Images.findOne({"_id":img}).link();
	},
	member(){
		let company = Companies.findOne();
		return Meteor.users.find({"_id":{$in:company.members}});
	},
	/*
	volunteer(){
		var userId = Meteor.users.findOne({"username":FlowRouter.getParam('username')})._id;
		return Volunteers.findOne({"user":userId});
	},
	email(){
		if (Roles.userIsInRole( Meteor.userId(), 'staff'))
			return Meteor.users.findOne({"username":FlowRouter.getParam('username')}).emails[0].address;
	},
	*/
	
	
	
});

Template.company_profile.events({
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
})