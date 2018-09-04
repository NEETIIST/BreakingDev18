import './shifts.html'

import { Shifts } from '/imports/api/shifts/shifts.js';

Template.ap_shifts.onRendered(function(){
	var self = this;
	Session.set("currentDay",0);
});

Template.ap_shifts.helpers({
	shifts() {
		return Shifts.find();
	},
	singleDay() {
		var ar = Shifts.find().fetch();
		var distinctAr = _.uniq(ar, false, function(d) {return d.day});
		var disctinctVal = _.pluck(distinctAr, 'day');
		return disctinctVal ;
	},
	currentDay(){
		return Session.get("currentDay");
	},
	isActiveDay(d){
		if ( d == Session.get("currentDay") )
			return "f-red";
		else
			return "hvr-white-to-red";
	},
	dayShifts(d){
		//console.log(d);
		//console.log(Shifts.find({"day":d}));
		return Shifts.find({"day":d});
	},
	username(id){
		return Meteor.users.findOne({"_id":id}).username;
	}
});

Template.ap_shifts.events({

	'click .selectDay': function(e,t){
		Session.set("currentDay",parseInt(this));
	},

	'click #ap-remove-shift': function(){
		Meteor.call("removeShift", this._id, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	},

	'click #ap-close-shift': function(){
		Meteor.call("closeShift", this._id, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	},

	'click #ap-reopen-shift': function(){
		Meteor.call("reopenShift", this._id, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	},

	'click .ap-assign-user': function(e){
		Meteor.call("assignUser", e.target.id, this+"", function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	},

	'click .ap-unassign-user': function(e){
		Meteor.call("removeUser", e.target.id, this+"", function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	},

	'submit #ap-shifts': function(event){

		event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const day = target.day.value;
	    const start = target.start.value;
	    const end = target.end.value;
	 
	    // Meteor Call Processing
	    Meteor.call("newShift", day, start, end, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                //alert(TAPi18n.__('ap-shifts-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	 
	    // Clear form
	    target.day.value = "";
	    target.start.value = '';
	    target.end.value = '';

	}
});