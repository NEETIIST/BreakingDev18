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
			doc.team = null;
			doc.payment = false;
			Devs.insert(doc);

			console.log("Created dev associated with user: " + doc.user);
		}
	},

	editDev: function(doc)
	{
		let dev = Devs.findOne({"_id":doc._id});
		console.log(doc.modifier);
		// User must own the profile it's updating
		if ( this.userId != dev.user )
			throw new Meteor.Error('not-owner', "User doesn't own this profile");
		else
		{
			Devs.update(doc._id,doc.modifier);
		}
	},

	confirmPayment: function(id)
	{
		if (Roles.userIsInRole(this.userId, "staff"))
		{
			let dev = Devs.findOne({"_id":id});
			Devs.update(dev._id, {'$set':{ payment: true }});
		}
	},

	cancelPayment: function(id)
	{
		if (Roles.userIsInRole(this.userId, "staff"))
		{
			let dev = Devs.findOne({"_id":id});
			Devs.update(dev._id, {'$set':{ payment: false }});
		}
	},

	sendDevEmail(user,subject,message)
	{
		// Admin Use Only
		if ( Roles.userIsInRole(this.userId, "staff") )
		{
			this.unblock();

			let targetEmail = Meteor.users.findOne({"username":user}).emails[0].address;

			if ( targetEmail == undefined )
				throw new Meteor.Error('not-found-email', "Can't find an email to send");
			else
			{
				Email.send({
		            to: targetEmail,
		            from: "no-reply@breakingdev.pt",
		            subject: subject,
		            text: message ,
		        });
			}
		}
	}

});
