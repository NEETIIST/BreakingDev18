import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Promocodes = new Mongo.Collection( 'promocodes' );

Promocodes.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

Promocodes.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

PromocodesSchema = new SimpleSchema({
	code: {
		type: String,
		label: TAPi18n.__('promocodes-code'),
	},
	value: {
		type: Number,
		label: TAPi18n.__('promocodes-value'),	
	},
	used: {
		type: Boolean,
		label: TAPi18n.__('promocodes-used'),
	},
	user: {
		type: String,
		optional:true,
		label: TAPi18n.__('promocodes-user'),
	},
});