import { Meteor } from 'meteor/meteor';
import { Sponsors } from '../sponsors.js';

Meteor.publish('sponsors.own', function(){
	var id = this.userId ;
	return Sponsors.find({'user':id});
});

Meteor.publish('sponsors.visitor', function(username){
	var id = Meteor.users.findOne({"username":username})._id;
	return Sponsors.find({'user':id});
});

//Admin Use
Meteor.publish('sponsors.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Sponsors.find();
});
