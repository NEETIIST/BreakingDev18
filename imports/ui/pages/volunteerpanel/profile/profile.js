import './profile.html';

import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.vp_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("volunteers.own");
	});
	this.editProfile = new ReactiveVar( false );
})

Template.vp_profile.helpers({
	hasProfile(){
		return (Volunteers.find().count() > 0);
	},
	editProfile(){
		return Template.instance().editProfile.get();
	},
	currentVolunteer(){
		return Volunteers.findOne({"user":Meteor.userId()});
	},
	username()
	{
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	email(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).emails[0].address;
	}
});

Template.vp_profile.events({
	'click #profile-edit': function(){
		Template.instance().editProfile.set(true);	
	},
	'click #profile-edit-cancel': function(){
		Template.instance().editProfile.set(false);	
	}
})

Template.vp_profile_add.helpers({
	Volunteers(){
		return Volunteers;
	},
});

Template.vp_profile_edit.helpers({
	Volunteers(){
		return Volunteers;
	},
	currentVolunteer(){
		return Volunteers.findOne({"user":Meteor.userId()});
	},
});

AutoForm.addHooks(['addVolunteer'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('volunteers-add-success'));
		FlowRouter.go("VolunteerPanel");
	}
});

AutoForm.addHooks(['editVolunteer'],{
	onSuccess: function(formType, result) {
		alert(TAPi18n.__('volunteers-edit-success'));
		FlowRouter.go("VolunteerPanel");
	}
});