// Contact Request Database
// Automatic email sent to breakingdev@neeti.tecnico.ulisboa.pt
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Contact = new Mongo.Collection( 'contact' );

Contact.allow({
    insert() { return true; },
    update() { return false; },
    remove() { return false; }
});

ContactSchema = new SimpleSchema({
    name: {
        type: String,
        label: TAPi18n.__('contact-name'), 
        //i18nLabel: 'home_sponsor_name',
    },
    company: {
        type: String,
        label: TAPi18n.__('contact-company'), 
        //i18nLabel: 'home_sponsor_company',
    },
    phone: {
        type: Number,
        label: TAPi18n.__('contact-phone'), 
        //i18nLabel: 'home_sponsor_email',
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: TAPi18n.__('contact-mail'), 
        //i18nLabel: 'home_sponsor_email',
    }
});

//ContactSchema.i18n("schemas.contact");
Contact.attachSchema( ContactSchema ); 
