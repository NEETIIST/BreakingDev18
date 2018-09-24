import './companies.html';

import { Companies } from '/imports/api/companies/companies.js';
import { Images } from '/imports/api/images/images.js';
import { Sponsors } from '/imports/api/sponsors/sponsors.js';

// Team Add
Template.ap_companies.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	})
	
});

Template.ap_companies.helpers({
	company(){
		return Companies.find();
	},
	getImage(img)
	{
		//console.log(this);
		//console.log(img);
		//console.log(Images.findOne({"_id":img}).link());
		return Images.findOne({"_id":img}).link();
	},
});

Template.ap_companies.events({
	"click #ap-companies-generate-code": function(){
		//console.log(this);
		Meteor.call("generateCode", this.short, function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            //alert(TAPi18n.__('ap-devs-confirm-payment-success'));
	        }
		});
	},

	"click #ap-companies-remove-code": function(){
		Meteor.call("removeCode", this+"", function (err, data) {
	        if(err){
	            alert(err);
	        }else{
	            //alert(TAPi18n.__('ap-devs-confirm-payment-success'));
	        }
		});
	},

	"click #ap-companies-delete": function(){
		if ( confirm(TAPi18n.__('ap-companies-delete-confirm')) )
		{
			Meteor.call("removeCompany", this._id, function (err, data) {
		        if(err){
		            alert(err);
		        }else{
		            alert(TAPi18n.__('ap-companies-delete-success'));
		        }
			});
		}
	},
});

// Company Add
Template.ap_companies_add.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	})
});

Template.ap_companies_add.helpers({
	Companies(){
		return Companies;
	},
});

AutoForm.addHooks(['addCompany'], {
    onSuccess: function(operation, result, template) {
    	alert(TAPi18n.__('ap-companies-add-success'));
    	FlowRouter.go("AdminCompanies");	
    },
   	onError: function(operation, error, template) {
     	console.log(error);
  	}
});

// Company Edit
Template.ap_companies_edit.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("companies.all");
	})
});

Template.ap_companies_edit.helpers({
	Companies(){
		return Companies;
	},
	company(){
		let short = FlowRouter.getParam('short') + "";
		console.log(Companies.findOne({"short":short}));
		return Companies.findOne({"short":short});
	},
});

AutoForm.addHooks(['editCompanyAdmin'], {
    onSuccess: function(operation, result, template) {
    	alert(TAPi18n.__('ap-companies-edit-success'));
    	FlowRouter.go("AdminCompanies");	
    },
   	onError: function(operation, error, template) {
     	console.log(error);
  	}
});