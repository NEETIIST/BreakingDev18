import { Meteor } from 'meteor/meteor';
import { Teams } from '../teams.js';
import { Devs } from '/imports/api/devs/devs.js';

// Team the current user is associated with (soft check)
Meteor.publish('teams.own', function(){
	let dev = Devs.findOne({'user':this.userId});
	return Teams.find({"_id":dev.team});
});

//Admin Use
Meteor.publish('teams.all', function(){
	/*
	if (Roles.userIsInRole( this.userId, 'admin'))
		return Teams.find();
	else
		return 0 ;
	*/
	return Teams.find();
});