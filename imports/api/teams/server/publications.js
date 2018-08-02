import { Meteor } from 'meteor/meteor';
import { Teams } from '../teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Meteor.publish('teams.own', function(){
	//let dev = Devs.findOne({'user':this.userId});
	//let team = Teams.find({ $or: [{"captain": this.userId},{}] })
	// Must also return teams the user is a member of
	return Teams.find({"captain": this.userId, "abandoned":false});
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