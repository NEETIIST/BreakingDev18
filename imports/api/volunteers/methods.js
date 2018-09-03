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
		if ( vol.approved )
			throw new Meteor.Error('already-approved', "Volunteer already was approved, can't change the information");
		else
		{
			Volunteers.update(doc._id,doc.modifier);
		}
	},

	applyVolunteer: function()
	{
		let vol = Volunteers.findOne({"user":this.userId});
    	let user = Meteor.users.findOne({"_id":this.userId});

		// User must be a volunteer
		if ( ! Roles.userIsInRole(this.userId, "volunteer") )
			throw new Meteor.Error('not-volunteer', "User is not a volunteer, can't apply to be a volunteer");
		// User must have volunteer profile
		else if ( vol == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have any profile info yet");
		// User must not have applied already
		else if ( vol.approved || vol.pending )
			throw new Meteor.Error('already-applied', "Volunteer already applied");
		else
		{
			Volunteers.update(vol._id,{'$set':{pending:true}});
		}
	},

	approveVolunteer: function(id)
	{
		let vol = Volunteers.findOne({"_id":id});
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User can't perform this action");
		else
			Volunteers.update(vol._id,{'$set':{pending:false, approved:true}});
	},

	removeVolunteer: function(id)
	{
		let vol = Volunteers.findOne({"_id":id});
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User can't perform this action");
		else
			Volunteers.update(vol._id,{'$set':{pending:false, approved:false}});
	},
});
