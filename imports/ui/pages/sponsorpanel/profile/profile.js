import './profile.html';

import { Sponsors } from '/imports/api/sponsors/sponsors.js';

Template.sp_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
})

Template.sp_profile.helpers({
	Sponsors(){
		return Sponsors;
	},
	currentSponsor(){
		return Sponsors.findOne({"user":Meteor.userId()});
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

Template.sp_profile.events({
	
})

AutoForm.addHooks(['editSponsor'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('devs-edit-success'));
		FlowRouter.go("SponsorPanel");
	}
});