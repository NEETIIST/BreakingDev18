import { Meteor } from 'meteor/meteor';
import { Companies } from '../companies.js';

Meteor.publish('companies.own', function(){
	return Companies.find({"members":this.userId},{ fields: Companies.publicFields });
});

//Admin Use
Meteor.publish('companies.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Companies.find();
});
