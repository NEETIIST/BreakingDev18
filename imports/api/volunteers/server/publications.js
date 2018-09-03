import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteers.own', function(){
	var id = this.userId ;
	return Volunteers.find({'user':id});
});

//Admin Use
Meteor.publish('volunteers.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Volunteers.find();
});
