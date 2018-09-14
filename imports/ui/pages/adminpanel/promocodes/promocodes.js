import './promocodes.html'

import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';
import { Promocodes } from '/imports/api/promocodes/promocodes.js';

Template.ap_promocodes.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("promocodes.all");
	})
});

Template.ap_promocodes.helpers({
	promocode() {
		return Promocodes.find({"used": false});
	},
	usedPromocode() {
		return Promocodes.find({"used": true});
	},
	username(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.username;
	},
	/*
	email(){
		let user = Meteor.users.findOne({"_id":this.user});
		return user.emails[0].address;
	},
	*/
});

Template.ap_promocodes.events({

	'submit #ap-promocodes': function(event){

		event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const code = target.code.value;
	    const value = parseInt(target.value.value);
	 
	    // Meteor Call Processing
	    Meteor.call("newPromocode", code, value, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-promocodes-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	 
	    // Clear form
	    target.code.value = "";
	    target.value.value = '';

	},

	'click #cancel-code': function(){
		Meteor.call("removePromocode", this._id, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            //alert(TAPi18n.__('ap-devs-cancel-payment-success'));
	        }
		});
	},

})