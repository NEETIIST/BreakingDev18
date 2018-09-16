import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Companies = new Mongo.Collection( 'companies' );

Companies.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

CompaniesSchema = new SimpleSchema({
	
});

Companies.attachSchema( CompaniesSchema ); 

Companies.publicFields = {
	
};