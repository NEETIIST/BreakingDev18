import './shifts.html'

import { Shifts } from '/imports/api/shifts/shifts.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Template.vp_shifts.onCreated(function(){
	this.showHelp = new ReactiveVar( false );
});

Template.vp_shifts.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var vol = Volunteers.findOne({"user":Meteor.userId()});
		if ( vol != undefined && vol.approved )
			console.log("");
			//FlowRouter.go("VolunteerPanel");
		else
			FlowRouter.go("VolunteerPanel");
	});
})

Template.vp_shifts.helpers({
	singleDay() {
		var ar = Shifts.find().fetch();
		var distinctAr = _.uniq(ar, false, function(d) {return d.day});
		var disctinctVal = _.pluck(distinctAr, 'day');
		return disctinctVal ;
	},
	dayShifts(d){
		return Shifts.find({"day":d, "closed":false, "assigned":{ $not:Meteor.userId() }} );
	},
	userIsAvailable(){
		if ( this.available.includes(Meteor.userId()))
			return true;
	},
	userIsAssigned(){
		if ( this.assigned.includes(Meteor.userId()))
			return true;
	},
	assignedShifts(){
		return Shifts.find({assigned:Meteor.userId()});
	},
	showHelp(){
		return Template.instance().showHelp.get();
	},
});

Template.vp_shifts.events({
	'click #toggle-available': function(){
		if ( this.closed )
		{
			// Alertar que o turno já está fechado
		}
		else if ( this.available.includes(Meteor.userId()))
		{
			Meteor.call("makeSelfUnavailable", this._id, function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                
	            }
	    	});
		}
		else
		{
			Meteor.call("makeSelfAvailable", this._id, function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                
	            }
	    	});
		}
	},

	'click #toggle-help':function(){
		Template.instance().showHelp.set(! Template.instance().showHelp.get());
	}
})
