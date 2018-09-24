import { Meteor } from 'meteor/meteor';
import { Teams } from '../teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Meteor.publish('teams.own', function(){
	//let dev = Devs.findOne({'user':this.userId});
	//let team = Teams.find({ $or: [{"captain": this.userId},{ "members": this.userId }], {"abandoned":false});
	// Must also return teams the user is a member of
	//return Teams.find({"captain": this.userId, "abandoned":false});	
	return Teams.find({$and:[{ $or: [{"captain": this.userId},{ "members": this.userId }]},{"abandoned":false}]});
});

Meteor.publish('teams.visitor', function(number){
	return Teams.find({"number": parseInt(number), "abandoned":false},{ fields: Teams.publicFields });
});

Meteor.publish('teams.visitor.id', function(id){
	return Teams.find({"_id": id, "abandoned":false},{ fields: Teams.publicFields });
});

Meteor.publish('teams.visitor.username', function(username){
	let userId = Meteor.users.findOne({"username":username})._id;
	return Teams.find({$and:[{ $or: [{"captain": userId},{ "members": userId }]},{"abandoned":false}]},{ fields: Teams.publicFields });
});

Meteor.publish('teams.available', function(){
	return Teams.find({$where: "this.members.length < 3","abandoned":false,"pending":false,"validated":false},{ fields: Teams.publicFields });
});

Meteor.publish('teams.sponsor',function(){
	if (Roles.userIsInRole( this.userId, 'sponsor'))
		return Teams.find({},{ fields: Teams.publicFields });
});

//Admin Use
Meteor.publish('teams.all', function(){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Teams.find();
});
