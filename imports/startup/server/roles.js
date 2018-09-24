import { Companies } from '/imports/api/companies/companies.js';
import { Sponsors } from '/imports/api/sponsors/sponsors.js';

Meteor.methods({

    registerDev: function(){
        let id = this.userId;
        // Nothing is a role, but somehow it's working
        if (  Roles.userIsInRole( this.userId, 'staff') ||  Roles.userIsInRole( this.userId, 'sponsor') ||  Roles.userIsInRole( this.userId, 'dev') ||  Roles.userIsInRole( this.userId, 'volunteer') )
            console.log("User "+ id +" already has a role");
        else
        {
            console.log("User "+ id +" is now a Dev");
            Roles.removeUsersFromRoles( id, 'nothing' );
            Roles.addUsersToRoles(id, 'dev');
        }
    },

    registerStaff: function(password){
        if ( password == Meteor.settings.adminPassword )
        {
            Roles.addUsersToRoles(this.userId, 'staff');
            Roles.removeUsersFromRoles( this.userId, 'nothing' );
        }
        else
            throw new Meteor.Error('wrong-password', "Wrong Password");
    },

    makeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'staff') )
        {
            Roles.addUsersToRoles(id, 'staff');
            Roles.removeUsersFromRoles(id, 'nothing' );
        }
    },

    removeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'staff') )
        {
            Roles.setUserRoles(id, [], '');
        }
    },

    registerVolunteer: function(){
        let id = this.userId;
        // Nothing is a role, but somehow it's working
        if (  Roles.userIsInRole( this.userId, 'staff') ||  Roles.userIsInRole( this.userId, 'sponsor') ||  Roles.userIsInRole( this.userId, 'dev') ||  Roles.userIsInRole( this.userId, 'volunteer') )
            console.log("User "+ id +" already has a role");
        else
        {
            console.log("User "+ id +" is now a Volunteer");
            Roles.removeUsersFromRoles( id, 'nothing' );
            Roles.addUsersToRoles(id, 'volunteer');
        }
    },

    registerSponsor: function(password){
        let id = this.userId;
        // Nothing is a role, but somehow it's working
        if (  Roles.userIsInRole( this.userId, 'staff') ||  Roles.userIsInRole( this.userId, 'sponsor') ||  Roles.userIsInRole( this.userId, 'dev') ||  Roles.userIsInRole( this.userId, 'volunteer') )
            console.log("User "+ id +" already has a role");
        else
        {
            // Check Password and match with company
            let comp = Companies.findOne({"codes":password});
            if ( comp == undefined )
                throw new Meteor.Error('wrong-code', "Unrecognized code, please try again or get in touch with the staff");
            else
            {
                console.log("User "+ id +" is now a Sponsor");
                Roles.removeUsersFromRoles( id, 'nothing' );
                Roles.addUsersToRoles(id, 'sponsor');

                // Create Sponsor Profile Associated with this User
                let sponsor = {
                    user:this.userId,
                    company: comp._id
                };

                //console.log(sponsor);

                Sponsors.insert(sponsor);
                console.log("Created sponsor associated with user: " + sponsor.user);

                // Remove Code from company
                let newCodes = comp.codes;
                newCodes = newCodes.filter(e => e !== password);
                Companies.update(comp._id, {'$set':{ codes: newCodes }});
                Companies.update(comp._id, {'$push':{ members: this.userId }});
            }
        }
    },

});

function userHasRole(id)
{
    if ( Roles.userIsInRole( id, 'dev') )
        return true;
    if ( Roles.userIsInRole( id, 'volunteer') )
        return true;
    if ( Roles.userIsInRole( id, 'sponsor') )
        return true;
    if ( Roles.userIsInRole( id, 'staff') )
        return true;
    return false;
}