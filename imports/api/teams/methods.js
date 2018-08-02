import { Teams } from './teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Meteor.methods({

	createTeam: function(doc){

		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});

		// User must be a Dev
		if ( ! Roles.userIsInRole(this.userId, "dev") )
			throw new Meteor.Error('not-dev', "User is not a dev, can't create this type of profile");
		// Current user must not be on a team already
		else if ( dev.team != null )
			throw new Meteor.Error('already-on-team', "User already is on a team, can't create another one");
		else
		{
			doc.number = Teams.find().count()+1;
			doc.captain = this.userId;
			doc.validated = false;
			doc.pending = false;
			doc.registration = null;
			doc.members = [];
			let newTeam = Teams.insert(doc);
			
			// Associate Captain with this team
			Devs.update(dev._id, {'$set':{ team: newTeam }} );

			console.log("Created team #" + doc.number + " , by the user: "+doc.captain);
		}
	},

	destroyTeam: function()
	{
		let user = Meteor.users.findOne({"_id":this.userId});
		let dev = Devs.findOne({"user":this.userId});
		let team = Teams.findOne({"captain": this.userId});

		// User must be the captain of the team
			// This is assured by finding the team the user belongs to, if none, it's not captain
			if ( team == undefined )
				throw new Meteor.Error('not-captain', "User is not a team captain");
		// Team must be empty of members
		if ( team.members.length != 0)
			throw new Meteor.Error('team-not-empty', "Team still has other users");
		else
		{
			// Dissociate user from this team 
			Devs.update(dev._id, {'$set':{ team: null }} );
			// Good to be disabled
			// To Do
		}
	}

});
