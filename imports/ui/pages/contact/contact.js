import { Contact } from '/imports/api/contact/contact.js';
import { Meteor } from 'meteor/meteor';
import './contact.html';

Template.contact.onCreated(function () {

});

Template.contact.onRendered( function(){
	window.scrollTo(0,0);
	$("html").css({ "overflow-y":"scroll" });
})

Template.contact.helpers({
	Contact(){
    	return Contact;
  	},
});

Template.contact.events({
	'click #open-menu': function(){
		$("#open-menu").hide("fade", 200, function(){
			$("#menu-col").show("slide", {direction:"right"}, 1000, function(){
				$("#close-menu").show("fade",200);
			});
		});
	},

	'click #close-menu': function(){
		$("#close-menu").hide("fade", 200, function(){
			$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
				$("#open-menu").show("fade",200);
			});
		});
	},

	'click #menu-goindex': function() {
		FlowRouter.go("Index");
	},
	
});
