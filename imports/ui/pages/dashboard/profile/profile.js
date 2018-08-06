import './profile.html';

import { Devs } from '/imports/api/devs/devs.js';

Template.dash_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.own");
	});
	this.editProfile = new ReactiveVar( false );
})

Template.dash_profile.helpers({
	hasProfile(){
		return (Devs.find().count() > 0);
	},
	editProfile(){
		return Template.instance().editProfile.get();
	},
	currentDev(){
		return Devs.findOne({"user":Meteor.userId()});
	},
	username()
	{
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	email(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).emails[0].address;
	}
});

Template.dash_profile.events({
	'click #profile-edit': function(){
		Template.instance().editProfile.set(true);	
	},
	'click #profile-edit-cancel': function(){
		Template.instance().editProfile.set(false);	
	}
})

Template.dash_profile_add.onRendered(function() {
	
});

Template.dash_profile_add.helpers({
	Devs(){
		return Devs;
	},
});

Template.dash_profile_edit.helpers({
	Devs(){
		return Devs;
	},
	currentDev(){
		return Devs.findOne({"user":Meteor.userId()});
	},
});

AutoForm.addHooks(['addDev'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('devs-add-success'));
		FlowRouter.go("Dashboard");
	}
});

AutoForm.addHooks(['editDev'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('devs-edit-success'));
		FlowRouter.go("Dashboard");
	}
});