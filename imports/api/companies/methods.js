import { Companies } from './companies.js';

Meteor.methods({

	createCompany: function(doc){
		// User must be an admin
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this operation");
		else
		{
			//check([doc.name, doc.college, doc.course, doc.bio, doc.skills, doc.interest ], [String]);
			//check([doc.age], [Number]);

			doc.members = [];
			doc.codes = [];
			doc.usedCodes = [];
			Companies.insert(doc);
		}
	},

	removeCompany: function(id){
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this");
		else
		{
			Companies.remove(id);
		}
	},

	editCompanyAdmin: function(doc)
	{
		let company = Companies.findOne({"_id":doc._id});
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this operation");
		else
		{
			Companies.update(doc._id,doc.modifier);
		}
	},

	editCompany: function(doc)
	{
		let company = Companies.findOne({"_id":doc._id});
		if ( ! Roles.userIsInRole(this.userId, "sponsor") )
			throw new Meteor.Error('not-sponsor', "User doesn't have permission for this operation");
		else if ( !((company.members).includes(this.userId)) )
			throw new Meteor.Error('not-member', "User doesn't have permission for this operation");
		else
		{
			Companies.update(doc._id,doc.modifier);
		}
	},

	generateCode: function(comp){

		let company = Companies.findOne({"short":comp});
		// User must be an admin
		if ( ! Roles.userIsInRole(this.userId, "staff") )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this operation");
		else
		{
			let newCodes = company.codes;
			let genCode = generatenewCode();
			newCodes.push(genCode);
			Companies.update(company._id, {'$set':{ codes: newCodes }});
		}	
	},

	removeCode: function(code){
		let company = Companies.findOne({"codes":code});
		if ( ! Roles.userIsInRole(this.userId, "staff")  )
			throw new Meteor.Error('not-staff', "User doesn't have permission for this operation");
		else
		{
			let newCodes = company.codes;
			newCodes = newCodes.filter(e => e !== code);
			Companies.update(company._id, {'$set':{ codes: newCodes }});
		}	
	},

});

function generatenewCode(){
	// Generates 6 digit alphanumeric pass not used in any other team
	let pass = Math.random().toString(36).substring(7);
	let comp = Companies.find({"codes":pass});
	//console.log(team.count());
	if ( comp.count() == 0)
		return pass;
	else
		generatenewCode();
}