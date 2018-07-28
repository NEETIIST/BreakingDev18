import './profile.html';

import { Devs } from '/imports/api/devs/devs.js';

Template.dash_profile.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.own");
	});
})

Template.dash_profile.helpers({
	hasProfile(){
    	return (Devs.find().count() > 0);
  	},
});

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
    }
});

AutoForm.addHooks(['editDev'],{
    onSuccess: function(formType, result) {
      	alert(TAPi18n.__('devs-edit-success'));
    }
});