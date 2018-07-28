import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Devs = new Mongo.Collection( 'devs' );

Devs.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

DevsSchema = new SimpleSchema({
	user: {
		type: String,
		label: TAPi18n.__('devs-user'), 
		autoform: {
        	type: "hidden",
        	label: false
    	},
    	optional: true,
    	//unique: true,
	},
	name: {
		type: String,
		label: TAPi18n.__('devs-name'),
	},
	age: {
		type: Number,
		label: TAPi18n.__('devs-age'),
	},
	college: {
		type: String,
		label: TAPi18n.__('devs-college'),
	},
	course: {
		type: String,
		label: TAPi18n.__('devs-course'),
	},
	bio: {
	    type: String,
	    autoform: {
	      	rows: 4,
	      	placeholder: TAPi18n.__('devs-bio-desc')
	    },
	    label: TAPi18n.__('devs-bio'),
	},
	skills: {
		type: String,
		autoform: {
	  		rows: 2,
	  		placeholder: TAPi18n.__('devs-skills-desc')
		},
		label: TAPi18n.__('devs-skills'),
	},
	interest: {
		type: String,
		autoform: {
  			rows: 2,
  			placeholder: TAPi18n.__('devs-interest-desc')
		},
		label: TAPi18n.__('devs-interest'),
	},
	github: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-github'),
	},
	twitter: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-twitter'),
	},
	linkedin: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-linkedin'),
	},
	
});

Devs.attachSchema( DevsSchema ); 
