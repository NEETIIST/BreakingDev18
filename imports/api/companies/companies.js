import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from '/imports/api/images/images.js';
SimpleSchema.extendOptions(['autoform']);

export const Companies = new Mongo.Collection( 'companies' );

Companies.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

Companies.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

CompaniesSchema = new SimpleSchema({
	name: {
		type: String,
		label: TAPi18n.__('companies-name'),
	},
	short: {
        type: String,
        label: TAPi18n.__('companies-short'),
    },
	work: {
        type: String,
        autoform: {
            rows: 3,
            placeholder: TAPi18n.__('companies-work-desc')
        },
        optional: true,
        label: TAPi18n.__('companies-work'),
    },
    search: {
        type: String,
        autoform: {
            rows: 3,
            placeholder: TAPi18n.__('companies-search-desc')
        },
        optional: true,
        label: TAPi18n.__('companies-search'),
    },
    category: {
        type: String,
        autoform: {
            placeholder: TAPi18n.__('companies-category-desc')
        },
        optional: true,
        label: TAPi18n.__('companies-category'),
    },
    website: {
        type: String,
        optional: true,
        label: TAPi18n.__('companies-website'),
    },
    email: {
        type: String,
        optional: true,
        label: TAPi18n.__('companies-email'),
    },
    logo: {
        type: String,
        //optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                uploadTemplate: 'uploadForm',
            },
        },
        label: TAPi18n.__('companies-logo'),
    },
    members: {
        type: Array,
        autoform: { omit:true },
        optional: true,
        label: TAPi18n.__('companies-members'),
	},
	'members.$': { type: String },
    codes: {
		type: Array,
    	autoform: { omit:true },
    	optional: true,
	},
	'codes.$': { type: String },
    usedCodes: {
		type: Array,
    	autoform: { omit:true },
    	optional: true,
	},
	'usedCodes.$': { type: String },
});

Companies.attachSchema( CompaniesSchema ); 

Companies.publicFields = {
    name:1,
    short:1,
    work:1,
    search:1,
    category:1,
    website:1,
    email:1,
    logo:1,
    members:1	
};