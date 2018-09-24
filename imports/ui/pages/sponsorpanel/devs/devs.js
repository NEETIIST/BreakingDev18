import './devs.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.sp_devs.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("devs.sponsor");
		self.subscribe("teams.sponsor");
		self.subscribe("users.sponsor");
	})
});

Template.sp_devs.helpers({
	dev() {
		return Devs.find();
	},
	username(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.username;
	},
	email(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.emails[0].address;
	},
	teamName(){
		return Teams.findOne({"_id":this.team}).team_name;
	}
});

Template.sp_devs.events({
	/*
	'click #confirm-payment': function(){
		//console.log(this);
		Meteor.call("confirmPayment", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-devs-confirm-payment-success'));
	        }
		});
	},

	'click #cancel-payment': function(){
		Meteor.call("cancelPayment", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            alert(TAPi18n.__('ap-devs-cancel-payment-success'));
	        }
		});
	},
	*/
});