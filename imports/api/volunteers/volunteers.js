import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Volunteers = new Mongo.Collection( 'volunteers' );

Volunteers.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

VolunteersSchema = new SimpleSchema({
	user: {
		type: String,
		label: TAPi18n.__('volunteers-user'), 
		autoform: {
        	omit:true,
    	},
    	optional: true,
    	//unique: true,
	},
	name: {
		type: String,
		label: TAPi18n.__('volunteers-name'),
	},
	age: {
		type: Number,
		label: TAPi18n.__('volunteers-age'),
	},
	school: {
		type: String,
		label: TAPi18n.__('volunteers-college'),
	},
	course: {
		type: String,
		label: TAPi18n.__('volunteers-course'),
	},
	phone: {
		type: Number,
		label: TAPi18n.__('volunteers-phone'),
	},
	bio: {
	    type: String,
	    autoform: {
	      	rows: 4,
	      	placeholder: TAPi18n.__('volunteers-bio-desc')
	    },
	    label: TAPi18n.__('volunteers-bio'),
	},
	interest: {
		type: String,
		autoform: {
  			rows: 2,
  			placeholder: TAPi18n.__('volunteers-interest-desc')
		},
		label: TAPi18n.__('volunteers-interest'),
	},
	food: {
		type: String,
		autoform: {
  			placeholder: TAPi18n.__('volunteers-food-desc')
		},
		label: TAPi18n.__('volunteers-food'),
		optional: true,
	},
	pending: {
		type: String,
		optional:true,
		autoform: { omit:true },
	},
	approved:
	{
		type: Boolean,
		optional:true,
		autoform: { omit:true },
	},
});

Volunteers.attachSchema( VolunteersSchema ); 

Volunteers.publicFields = {
	user:1,
	name:1,
	college:1,
	course:1,
	bio:1,
	interest:1	
};