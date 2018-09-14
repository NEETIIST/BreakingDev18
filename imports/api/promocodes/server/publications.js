import { Meteor } from 'meteor/meteor';
import { Promocodes } from '../promocodes.js';

Meteor.publish('promocodes.own', function(){
	var id = this.userId ;
	return Promocodes.find({'user':id});
});

//Admin Use
Meteor.publish('promocodes.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Promocodes.find();
});
