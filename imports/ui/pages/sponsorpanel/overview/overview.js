import './overview.html';

import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Companies } from '/imports/api/companies/companies.js';
import { Images } from '/imports/api/images/images.js';

Template.sp_overview.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
})

Template.sp_overview.helpers({
	ownCompany(){
		return Companies.findOne({"members":Meteor.userId()});
	},
	ownProfile(){
		return Sponsors.findOne({"user":Meteor.userId()});
	},
	/*
	username()
	{
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	},
	email(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).emails[0].address;
	}
	*/
	getImage(img)
	{
		return Images.findOne({"_id":img}).link();
	},
});

Template.sp_overview.events({
	
})
