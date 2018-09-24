import { Sponsors } from './sponsors.js';

Meteor.methods({

	/*
	createSponsor:function(company){
		// User must be a Dev and not have a profile previously	
		if ( Sponsors.find({"user":this.userId}).count() > 0 )
			throw new Meteor.Error('already-profile', "User already has a profile");
		else if ( ! Roles.userIsInRole(this.userId, "sponsor") )
			throw new Meteor.Error('not-sponsor', "User is not a sponsor, can't create this type of profile");
		else
		{
			let sponsor = {
				user:this.userId,
				company: company
			};

			Sponsors.insert(sponsor);
			console.log("Created sponsor associated with user: " + doc.user);
		}
	},
	*/

	editSponsor: function(doc)
	{
		let sponsor = Sponsors.findOne({"_id":doc._id});
		//console.log(doc.modifier);
		// User must own the profile it's updating
		if ( this.userId != sponsor.user )
			throw new Meteor.Error('not-owner', "User doesn't own this profile");
		else
		{
			Sponsors.update(doc._id,doc.modifier);
		}
	},

	addToFavorites: function(id)
	{
		let sponsor = Sponsors.findOne({"user":this.userId});
		if ( sponsor != undefined )
		{
			let fav = sponsor.favorites;
			fav.push(id);
			Sponsors.update(sponsor._id,{'$set':{favorites:fav}});
		}
	},

	removeFromFavorites: function(id)
	{
		var sponsor = Sponsors.findOne({"user":this.userId});
		if ( sponsor != undefined )
		{
			var favs = sponsor.favorites ;
			var search_term = id;
			for (var i=favs.length-1; i>=0; i--) {
				if (favs[i] === search_term) {
				    favs.splice(i, 1);
				}
			}
			Sponsors.update(sponsor._id,{'$set':{favorites:favs}});
		}
	},

});
