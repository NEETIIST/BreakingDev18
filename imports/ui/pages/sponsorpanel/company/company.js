import './company.html';

import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Companies } from '/imports/api/companies/companies.js';

Template.sp_company.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
})

Template.sp_company.helpers({
	Sponsors(){
		return Sponsors;
	},
	Companies(){
		return Companies;
	},
	currentSponsor(){
		return Sponsors.findOne({"user":Meteor.userId()});
	},
	ownCompany(){
		return Companies.findOne({"members":Meteor.userId()});
	},
	/*
	username()
	{
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	email(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).emails[0].address;
	}
	*/
});

Template.sp_company.events({
	
})

AutoForm.addHooks(['editCompany'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('devs-edit-success'));
		FlowRouter.go("SponsorPanel");
	}
});