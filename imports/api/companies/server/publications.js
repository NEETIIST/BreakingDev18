import { Meteor } from 'meteor/meteor';
import { Companies } from '../companies.js';

Meteor.publish('companies.own', function(){
	return Companies.find({});
});

//Admin Use
Meteor.publish('companies.all', function(){
	if (Roles.userIsInRole( this.userId, 'companies'))
		return Companies.find();
});
