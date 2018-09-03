import { Volunteers } from './volunteers.js';

Meteor.methods({

	createVolunteer: function(doc){
		// User must be a Dev and not have a profile previously	
		if ( Volunteers.find({"user":this.userId}).count() > 0 )
			throw new Meteor.Error('already-profile', "User already has a profile");
		else if ( ! Roles.userIsInRole(this.userId, "volunteer") )
			throw new Meteor.Error('not-volunteer', "User is not a volunteer, can't create this type of profile");
		else
		{
			check([doc.name, doc.school, doc.course, doc.bio, doc.interest ], [String]);
			check([doc.age], [Number]);

			doc.user = this.userId;
			doc.pending = false;
			doc.approved = false;
			Volunteers.insert(doc);

			console.log("Created Volunteer associated with user: " + doc.user);
		}
	},

	editVolunteer: function(doc)
	{
		let vol = Volunteers.findOne({"_id":doc._id});
		//console.log(doc.modifier);
		// User must own the profile it's updating
		if ( this.userId != vol.user )
			throw new Meteor.Error('not-owner', "User doesn't own this profile");
		else
		{
			Volunteers.update(doc._id,doc.modifier);
		}
	},

});
