import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';

Meteor.publish('devs.own', function(){
	var id = this.userId ;
	return Devs.find({'user':id});
});

Meteor.publish('devs.username.visitor', function(username){
	var user = Meteor.users.findOne({"username":username});
	return Devs.find({"user":user._id},{ fields: Devs.publicFields });
})

Meteor.publish('devs.username.admin', function(username){
	if ( Roles.userIsInRole(this.userId, "staff") )
	{
		var user = Meteor.users.findOne({"username":username});
		return Devs.find({"user":user._id});
	}
})

// Sponsor Use
Meteor.publish('devs.sponsor', function(){
	if (Roles.userIsInRole( this.userId, 'sponsor'))
		return Devs.find({team : {$ne : null}},{ fields: Devs.publicFields });
});

//Admin Use
Meteor.publish('devs.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Devs.find();
});
