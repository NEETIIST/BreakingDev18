Meteor.methods({

    registerDev: function(){
        let id = this.userId;
        if ( userHasRole(id) )
            console.log("User "+ id +" already has a role");
        else
        {
            console.log("User "+ id +" is now a Dev");
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