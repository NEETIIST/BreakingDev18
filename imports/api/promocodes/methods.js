import { Promocodes } from './promocodes.js';
import { Devs } from '/imports/api/devs/devs.js';

Meteor.methods({

	newPromocode: function(c,v){
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			let promocode = {
				code: c,
				value: v,
				used: false,
				user: null
			}
			
			Promocodes.insert(promocode);
		}
    },

    removePromocode: function(id){
    	if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Promocodes.remove(id);
		}
    },

    usePromocode: function(code){
    	let promocode = Promocodes.findOne({"code": code});
    	if ( promocode == undefined )
    		throw new Meteor.Error('doesnt-exist', "Code doesn't exist");
    	else if ( promocode.used )
    		throw new Meteor.Error('already-used', "Code already used");
    	else
    	{
    		let pc = Promocodes.findOne({"user": this.userId});

	    	// User must not have promocode already
	    	if ( pc != undefined )
	    		throw new Meteor.Error('already-has-code', "User already has a promocode");
	    	else
	    	{
	    		Promocodes.update(promocode._id,{'$set':{ used: true, user:this.userId }});

	    		// If free code, payment is auto-confirmed
	    		if ( promocode.value == 10)
	    		{
	    			let dev = Devs.findOne({"user":this.userId});
					Devs.update(dev._id, {'$set':{ payment: true }});
	    		}
	    	}	
    	}
    },

    checkPromocode: function(){
    	let pc = Promocodes.findOne({"user": this.userId});
    	if ( pc != undefined )
    		return pc;
    	else
    		return false;
    },

});
