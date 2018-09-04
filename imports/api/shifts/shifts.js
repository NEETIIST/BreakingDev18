import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Shifts = new Mongo.Collection( 'shifts' );

Shifts.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

ShiftsSchema = new SimpleSchema({
	day: {
		type: Number,
		label: TAPi18n.__('shifts-day'),
	},
	start: {
		type: String,
		label: TAPi18n.__('shifts-start'),
	},
	end: {
		type: String,
		label: TAPi18n.__('shifts-end'),
	},
	closed: {
		type: Boolean,
		label: TAPi18n.__('shifts-closed'),
	},
	available: {
		type: Array,
		label: TAPi18n.__('shifts-available'),
	},
	'available.$': { type: String },
	assigned: {
		type: Array,
		label: TAPi18n.__('shifts-assigned'),
	},
	'assigned.$': { type: String },
	
});

Shifts.attachSchema( ShiftsSchema ); 

Shifts.publicFields = {
	day: 1,
	start: 1,
	end: 1,
	closed:1,
	available:1,
	assigned:1
};