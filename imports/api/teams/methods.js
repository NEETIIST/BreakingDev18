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
			let newTeam = Teams.insert(doc);
			
			// Associate Captain with this team
			Devs.update(dev._id, {'$set':{ team: newTeam }} );

			console.log("Created team #" + doc.number + " , by the user: "+doc.captain);
		}
	},

});
