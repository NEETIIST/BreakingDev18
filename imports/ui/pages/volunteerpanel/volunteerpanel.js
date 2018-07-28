import './volunteerpanel.html';

Template.volunteerPanel.onRendered(function(){
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
			FlowRouter.go("SponsorPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "volunteer") )
		{
			// Accepted
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "dev") )
		{
			FlowRouter.go("Dashboard");
		}
	});
})