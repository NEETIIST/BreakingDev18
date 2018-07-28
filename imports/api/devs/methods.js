import { Devs } from './devs.js';

Meteor.methods({

	createDev: function(doc){
		// User must be a Dev and not have a profile previously
		console.log("Created a Dev\n");

		if ( Devs.find({"user":this.userId}).count() > 0 )
			throw new Meteor.Error('already-profile', "User already has a profile");
		if ( ! Roles.userIsInRole(this.userId, "dev") )
			throw new Meteor.Error('not-dev', "User is not a dev, can't create this type of profile");

		check([doc.name, doc.college, doc.course, doc.bio, doc.skills, doc.interest ], [String]);
		check([doc.age], [Number]);

		doc.user = this.userId;
		Devs.insert(doc);
	},

});
