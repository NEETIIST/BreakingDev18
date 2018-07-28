import { Devs } from './devs.js';

Meteor.methods({

	createDev: function(doc){
		// User must be a Dev and not have a profile previously	
		if ( Devs.find({"user":this.userId}).count() > 0 )
			throw new Meteor.Error('already-profile', "User already has a profile");
		else if ( ! Roles.userIsInRole(this.userId, "dev") )
			throw new Meteor.Error('not-dev', "User is not a dev, can't create this type of profile");
		else
		{
			check([doc.name, doc.college, doc.course, doc.bio, doc.skills, doc.interest ], [String]);
			check([doc.age], [Number]);

			doc.user = this.userId;
			Devs.insert(doc);

			console.log("Created dev associated with user: " + doc.user);
		}
	},

	editDev: function(doc)
	{
		let dev = Devs.findOne({"_id":doc._id});

		// User must own the profile it's updating
		if ( this.userId != dev.user )
			throw new Meteor.Error('not-owner', "User doesn't own this profile");
		else
		{
			Devs.update(doc._id,doc.modifier);
		}
	}

});
