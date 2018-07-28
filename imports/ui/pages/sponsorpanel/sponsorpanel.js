import './sponsorpanel.html';

Template.sponsorPanel.onRendered(function(){
	//BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
	//Session.set("ap_activeMenu","ap_overview");
	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole(Meteor.userId(), "staff") )
		{
			FlowRouter.go("AdminPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "sponsor") )
		{
			// Accepted
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "volunteer") )
		{
			FlowRouter.go("VolunteerPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "dev") )
		{
			FlowRouter.go("Dashboard");
		}
	});
})