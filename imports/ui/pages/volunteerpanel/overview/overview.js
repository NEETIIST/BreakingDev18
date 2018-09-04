import './overview.html'

import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Shifts } from '/imports/api/shifts/shifts.js';

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
	},
	hasShifts(){
		return ( Shifts.find({available:Meteor.userId()}).count() > 0 || Shifts.find({assigned:Meteor.userId()}).count() > 0 );
	},
	hasShiftsAssigned(){
		return ( Shifts.find({assigned:Meteor.userId()}).count() > 0 );
	},
	hasShiftsAvailable(){
		return ( Shifts.find({available:Meteor.userId()}).count() > 0 );
	},
	nextShift(){
		return Shifts.findOne({assigned:Meteor.userId()});	
	},
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
