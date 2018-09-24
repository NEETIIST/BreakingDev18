import { Meteor } from 'meteor/meteor';
import { Companies } from '../companies.js';

Meteor.publish('companies.own', function(){
	return Companies.find({"members":this.userId},{ fields: Companies.publicFields });
});

Meteor.publish('companies.visitor', function(short){
	return Companies.find({"short":short},{ fields: Companies.publicFields });
});

Meteor.publish('companies.username', function(username){
	var member = Meteor.users.findOne({"username":username});
	return Companies.find({"members":member._id},{ fields: Companies.publicFields });
});

//Admin Use
Meteor.publish('companies.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Companies.find();
});
