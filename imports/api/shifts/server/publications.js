import { Meteor } from 'meteor/meteor';
import { Shifts } from '../shifts.js';

Meteor.publish('shifts.volunteer', function(){
	return Shifts.find({},{ fields: Shifts.publicFields });
});

//Admin Use
Meteor.publish('shifts.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Shifts.find();
});
