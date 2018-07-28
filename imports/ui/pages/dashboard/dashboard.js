import './dashboard.html';

Template.dashboard.onRendered(function(){
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
			FlowRouter.go("VolunteerPanel");
		}
		else if ( Roles.userIsInRole(Meteor.userId(), "dev") )
		{
			//Aprovado
		}
	});
});