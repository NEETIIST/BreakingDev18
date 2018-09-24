import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Sponsors = new Mongo.Collection( 'sponsors' );

Sponsors.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

SponsorsSchema = new SimpleSchema({
	user: {
		type: String,
		label: TAPi18n.__('sponsors-user'), 
		autoform: {
        	omit:true,
    	},
    	optional: true,
    	//unique: true,
	},
	name: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-name'),
	},
	company:
	{
		type: String,
		label: TAPi18n.__('sponsors-company'),	
	},
	job: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-job'),
	},
	info: {
	    type: String,
	    optional:true,
	    autoform: {
	      	rows: 4,
	      	placeholder: TAPi18n.__('sponsors-info-desc')
	    },
	    label: TAPi18n.__('sponsors-info'),
	},
	email: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-email'),
	},
	github: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-github'),
	},
	twitter: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-twitter'),
	},
	linkedin: {
		type: String,
		optional:true,
		label: TAPi18n.__('sponsors-linkedin'),
	},
	favorites: {
		type: Array,
    	autoform: { omit:true },
    	optional: true,
	},
	'favorites.$': { type: String },
	
});

Sponsors.attachSchema( SponsorsSchema ); 
