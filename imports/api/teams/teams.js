import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Teams = new Mongo.Collection( 'teams' );

Teams.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

TeamsSchema = new SimpleSchema({
	number: {
		type: Number,
		autoform: { omit:true },
    	optional: true,
	},
	team_name: {
		type: String,
		label: TAPi18n.__('teams-team-name'),
	},
	captain: {
		type: String,
		label: TAPi18n.__('teams-name'),
		autoform: { omit:true },
		optional: true,		
	},
	members: {
		type: Array,
    	maxCount: 3,
    	autoform: { omit:true },
    	optional: true,
    	//unique: true,
	},
	'members.$': { type: String },
	project_name: {
		type: String,
		label: TAPi18n.__('teams-project-name'),
	},
	idea: {
		type: String,
		label: TAPi18n.__('teams-idea'),
	},
	category: {
		type: String,
		allowedValues: ['Gaming', 'Web'],
		autoform:{
			type:"select",
			options: function(){return[{label:"Web",value:"Web"},{label:"Gaming",value:"Gaming"}]}
		},
		label: TAPi18n.__('teams-category'),
	},
	skills: {
		type: String,
		label: TAPi18n.__('teams-skills'),
	},
	validated: {
		type: Boolean,
		autoform: { omit:true },
    	optional: true,
	},
	pending: {
    	type: Boolean,
    	autoform: { omit:true },
    	optional: true,
	},
	registration: {
		type: Date,
		autoform: { omit:true },
		optional: true,
	},
	abandoned: {
		type: Boolean,
		autoform: { omit:true },
		optional: true,
	},
});

Teams.attachSchema( TeamsSchema ); 
