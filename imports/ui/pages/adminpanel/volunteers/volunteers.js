import './volunteers.html'

import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.ap_volunteers.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("volunteers.all");
	})
});

Template.ap_volunteers.helpers({
	volunteers() {
		return Volunteers.find();
	},
	username(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.username;
	},
	email(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.emails[0].address;
	},
});

Template.ap_volunteers.events({
	
	'click #confirm-aplication': function(){
		console.log(this);
		Meteor.call("approveVolunteer", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-volunteers-confirm-success'));
	        }
		});
	},

	'click #cancel-aplication': function(){
		Meteor.call("removeVolunteer", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-volunteers-cancel-success'));
	        }
		});
	},

})