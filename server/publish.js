//Admin User
Meteor.publish("users.all", function () {
	/*
    if (Roles.userIsInRole( this.userId, 'admin'))
		return Meteor.users.find();
	else
		return 0 ;*/
	return Meteor.users.find();
});

Meteor.publish("roles.all", function () {
	/*
    if (Roles.userIsInRole( this.userId, 'admin'))
		return Meteor.users.find();
	else
		return 0 ;*/
	return Meteor.roles.find();
});