import { Teams } from '/imports/api/teams/teams.js';

//Admin User
Meteor.publish("users.all", function () {
    if (Roles.userIsInRole( this.userId, 'staff'))
		return Meteor.users.find();
});

Meteor.publish("users.username", function(username){
	if (Roles.userIsInRole( this.userId, 'staff'))
		return Meteor.users.find({"username":username},{fields:{"username":1,"emails":1}} );
	else
		return Meteor.users.find({"username":username},{fields:{"username":1}} );
});

Meteor.publish("users.team",function(number){
	let team = Teams.findOne({"number":number});
	let members = [];
	members.push(team.captain);
	team.members.forEach(function(m){
		members.push(m);
	})
	return Meteor.users.find({"_id":{$in: members}}, {fields:{"username":1}});
});

Meteor.publish("users.team.own",function(){
	let team = Teams.findOne({$and:[{ $or: [{"captain": this.userId},{ "members": this.userId }]},{"abandoned":false}]});
	//console.log(team);
	if ( team != undefined )
	{
		let members = [];
		members.push(team.captain);
		if ( members != undefined )
		{
			team.members.forEach(function(m){
				members.push(m);
			})
			return Meteor.users.find({"_id":{$in: members}}, {fields:{"username":1}});
		}
	}
	else
		return;
});

Meteor.publish("users.sponsor", function(){
	if (Roles.userIsInRole( this.userId, 'sponsor'))
		return Meteor.users.find({},{fields:{"username":1, "emails":1}});
});

Meteor.publish("roles.all", function () {
    if (Roles.userIsInRole( this.userId, 'staff'))
		return Meteor.roles.find();	
});