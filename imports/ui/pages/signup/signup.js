import './signup.html'

Template.signup.onRendered( function(){
	window.scrollTo(0,0);
	$("#menu-signup").toggleClass("menu-active menu-hover");
	$("html").css({ "overflow-y":"scroll" });
})

Template.signup.helpers({
	
});

Template.signup.events({
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

Template.signupRoles.onRendered(function(){
	var self = this;
	self.autorun(function(){
		if ( ! Meteor.userId() )
		{
			FlowRouter.go("SignUp");	
		}
		else
		{
			if ( Roles.userIsInRole(Meteor.userId(), "nothing") )
			{
				FlowRouter.go("SignUpRoles");	
			}
			else if ( userHasRole(Meteor.userId()))
			{
				FlowRouter.go("Dashboard");	
			}
		}
	});
	
});

Template.signupRoles.events({
	'click #signup-dev': function(){
		if ( Meteor.userId() )
		{
			Meteor.call("registerDev", function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                FlowRouter.go("Dashboard");
	            }
        	});
		}
	},
	'click #signup-volunteer': function(){
		if ( Meteor.userId() )
		{
			Meteor.call("registerVolunteer", function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                FlowRouter.go("Dashboard");
	            }
        	});
		}
	},
	'click #signup-staff': function(){
		var pass = prompt("Password");
		if ( Meteor.userId() )
		{
			Meteor.call('registerStaff', pass, function (err, data) {
	            if(err){
	                console.log("err : " + err);
	            }else{
	                FlowRouter.go("AdminPanel");
	            }
        	});
		}
	},
	'click #signup-sponsor': function(){
		var pass = prompt(TAPi18n.__('sp-access-code'));
		if ( Meteor.userId() )
		{
			Meteor.call('registerSponsor', pass, function (err, data) {
	            if(err){
	                alert("err : " + err);
	            }else{
	                FlowRouter.go("SponsorPanel");
	            }
        	});
		}
	},
})

// Helper Functions
function userHasRole(id){
    if ( Roles.userIsInRole( id,"dev") )
        return true;
    if ( Roles.userIsInRole( id,"volunteer") )
        return true;
    if ( Roles.userIsInRole( id,"staff") )
        return true;
    if ( Roles.userIsInRole( id,"sponsor") )
        return true;
    return false;
}
