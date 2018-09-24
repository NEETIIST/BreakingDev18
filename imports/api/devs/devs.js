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
        	omit:true,
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
	phone: {
		type: Number,
		label: TAPi18n.__('devs-phone'),
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
	food: {
		type: String,
		autoform: {
  			placeholder: TAPi18n.__('devs-food-desc')
		},
		label: TAPi18n.__('devs-food'),
		optional: true,
	},
	github: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-github'),
		autoform: {
  			placeholder: TAPi18n.__('devs-github-desc')
		},
	},
	twitter: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-twitter'),
		autoform: {
  			placeholder: TAPi18n.__('devs-twitter-desc')
		},
	},
	linkedin: {
		type: String,
		optional:true,
		label: TAPi18n.__('devs-linkedin'),
		autoform: {
  			placeholder: TAPi18n.__('devs-linkedin-desc')
		},
	},
	team: {
		type: String,
		optional:true,
		autoform: { omit:true },
	},
	payment:
	{
		type: Boolean,
		optional:true,
		autoform: { omit:true },
	},
});

Devs.attachSchema( DevsSchema ); 

Devs.publicFields = {
	user:1,
	name:1,
	college:1,
	course:1,
	bio:1,
	skills:1,
	interest:1,
	team:1,
	github:1,
	twitter:1,
	linkedin:1,
};