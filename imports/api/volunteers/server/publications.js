import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteers.own', function(){
	var id = this.userId ;
	return Volunteers.find({'user':id});
});

Meteor.publish('volunteers.username.visitor', function(username){
	var user = Meteor.users.findOne({"username":username});
	return Volunteers.find({"user":user._id},{ fields: Volunteers.publicFields });
})

//Admin Use
Meteor.publish('volunteers.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Volunteers.find();
});

Meteor.publish('volunteers.username.admin', function(username){
	if ( Roles.userIsInRole(this.userId, "staff") )
	{
		var user = Meteor.users.findOne({"username":username});
		return Volunteers.find({"user":user._id});
	}
})

