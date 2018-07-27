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

    makeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'admin') )
        {
            Roles.addUsersToRoles(id, 'admin');
        }
    },

    removeAdmin: function(id){
        if ( Roles.userIsInRole( this.userId, 'admin') )
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