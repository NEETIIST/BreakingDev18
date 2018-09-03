import './overview.html'

import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.vp_overview.onRendered(function(){
	var self = this;
	self.autorun(function(){
		//self.subscribe('volunteers.own');
	})
})

Template.vp_overview.helpers({
	hasProfile(){
		let vol = Volunteers.findOne({"user":Meteor.userId()});
		return ( vol != undefined );
	},
	volunteer(){
		return Volunteers.findOne({"user":Meteor.userId()});
	},
	username(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	onlyReady(){
		return ( Volunteers.findOne({"user":Meteor.userId()}).pending == false && Volunteers.findOne({"user":Meteor.userId()}).approved == false );
	}

});

Template.vp_overview.events({
	'click #vp-apply': function(){
		Meteor.call("applyVolunteer", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('vp-apply-success'));
	        }
		});
	},
})
