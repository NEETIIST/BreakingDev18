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
        if ( password = Meteor.settings.adminPassword )
        {
            Roles.addUsersToRoles(this.userId, 'staff');
        }
    },

    makeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'staff') )
        {
            Roles.addUsersToRoles(id, 'staff');
        }
    },

    removeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'staff') )
        {
            Roles.setUserRoles(id, [], '');
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