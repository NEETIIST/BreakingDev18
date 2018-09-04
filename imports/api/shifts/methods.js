import { Shifts } from './shifts.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';

Meteor.methods({

    newShift: function(d,s,e){
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			let shift = {
				day:d,
				start:s,
				end:e,
				available:[],
				assigned:[],
				closed:false
			}
			
			Shifts.insert(shift);
		}
    },

    removeShift: function(id){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Shifts.remove(id);
		}
    },

    closeShift: function(id){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Shifts.update(id,{'$set':{ closed: true }});
		}
    },

    reopenShift: function(id){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Shifts.update(id,{'$set':{ closed: false }});
		}
    },

    assignUser: function(shift,userId){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Shifts.update(shift,{'$push':{ assigned: userId }});
			Shifts.update(shift,{'$pull':{ available: userId }});
		}	
    },

    removeUser: function(shift,userId){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Shifts.update(shift,{'$pull':{ assigned: userId }});
			Shifts.update(shift,{'$push':{ available: userId }});
		}	
    },

    makeSelfAvailable: function(shift){
    	let vol = Volunteers.findOne({"user":this.userId});
    	if ( ! Roles.userIsInRole(this.userId, "volunteer") )
			throw new Meteor.Error('not-volunteer', "User is not a volunteer");
		else if ( vol == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a volunteer profile");
		else if ( shift.closed )
			throw new Meteor.Error('shift-closed', "You can't add yourself from closed shifts");
		else
		{
			Shifts.update(shift,{'$push':{ available: this.userId }});
		}
    },

    makeSelfUnavailable: function(shift){
    	let vol = Volunteers.findOne({"user":this.userId});
    	if ( ! Roles.userIsInRole(this.userId, "volunteer") )
			throw new Meteor.Error('not-volunteer', "User is not a volunteer");
		else if ( vol == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a volunteer profile");
		else if ( shift.closed )
			throw new Meteor.Error('shift-closed', "You can't remove yourself from closed shifts");
		else
		{
			Shifts.update(shift,{'$pull':{ available: this.userId }});
		}
    },

});
