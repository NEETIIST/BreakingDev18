import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';

Meteor.publish('devs.own', function(){
	var id = this.userId ;
	return Devs.find({'user':id});
});

//Admin Use
Meteor.publish('devs.all', function(){
	if (Roles.userIsInRole( this.userId, 'admin'))
		return Devs.find();
	else
		return 0 ;
});
