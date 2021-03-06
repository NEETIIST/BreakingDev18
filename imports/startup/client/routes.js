import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/index/index.js';
import '../../ui/pages/faq/faq.js';
import '../../ui/pages/adminpanel/adminpanel.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/contact/contact.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/volunteerpanel/volunteerpanel.js';
import '../../ui/pages/sponsorpanel/sponsorpanel.js';
import '../../ui/pages/resetPassword/resetPassword.js';
import '../../ui/pages/dev/dev.js';
import '../../ui/pages/team/team.js';
import '../../ui/pages/volunteer/volunteer.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/company/company.js';
import '../../ui/pages/sponsor/sponsor.js';

// Set up all routes in the app
FlowRouter.route('/', {
  	name: 'Index',
  	action() {
		BlazeLayout.render('index');
  	},
});

FlowRouter.route('/faq', {
  	name: 'FAQ',
  	action() {
		BlazeLayout.render('faq');
  	},
});

FlowRouter.route('/admin', {
	name: 'AdminPanel',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_overview"});
			Session.set("ap_activeMenu","ap_overview");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/teams', {
	name: 'AdminTeams',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_teams"});
			Session.set("ap_activeMenu","ap_teams");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/devs', {
	name: 'AdminDevs',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_devs"});
			Session.set("ap_activeMenu","ap_devs");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/volunteers', {
	name: 'AdminVolunteers',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_volunteers"});
			Session.set("ap_activeMenu","ap_volunteers");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/email', {
	name: 'AdminEmail',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_email"});
			Session.set("ap_activeMenu","ap_email");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/email/:username', {
	name: 'AdminEmailByUser',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_email"});
			Session.set("ap_activeMenu","ap_email");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/shifts', {
	name: 'AdminShifts',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_shifts"});
			Session.set("ap_activeMenu","ap_shifts");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/promocodes', {
	name: 'AdminPromocodes',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_promocodes"});
			Session.set("ap_activeMenu","ap_promocodes");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/companies', {
	name: 'AdminCompanies',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_companies"});
			Session.set("ap_activeMenu","ap_companies");
		}
		else
			FlowRouter.go("Login");
  	},
});


FlowRouter.route('/admin/companies/add', {
	name: 'AdminCompaniesAdd',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_companies_add"});
			Session.set("ap_activeMenu","ap_companies");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/admin/companies/edit/:short', {
	name: 'AdminCompaniesEdit',
  	action() {
  		if ( Meteor.userId() )
  		{
			BlazeLayout.render('adminPanel', {ap_content:"ap_companies_edit"});
			Session.set("ap_activeMenu","ap_companies");
		}
		else
			FlowRouter.go("Login");
  	},
});



FlowRouter.route('/dashboard', {
	name: 'Dashboard',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_overview");
			BlazeLayout.render('dashboard', {dash_content:"dash_overview"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/profile', {
	name: 'DevProfile',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_profile");
			BlazeLayout.render('dashboard', {dash_content:"dash_profile"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team', {
	name: 'DevTeam',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_manage"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/edit', {
	name: 'DevTeamEdit',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_edit"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/add', {
	name: 'DevTeamAdd',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_add"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/invite', {
	name: 'DevTeamInvite',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_invite"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/find', {
	name: 'DevTeamFind',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_find"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/join', {
	name: 'DevTeamJoin',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_join"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/join/:number', {
	name: 'DevTeamJoin',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_join"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/dev/team/payment', {
	name: 'DevTeamPayment',
	action() {
		if ( Meteor.userId() )
		{
			Session.set("dash_activeMenu","dash_team");
			BlazeLayout.render('dashboard', {dash_content:"dash_team", team_option:"dash_team_payment"});
		}
		else
			FlowRouter.go("Login");
	},
});

FlowRouter.route('/dashboard/sponsor', {
	name: 'SponsorPanel',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('sponsorPanel', {sp_content:"sp_overview"});
			Session.set("sp_activeMenu","sp_overview");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/sponsor/profile', {
	name: 'SponsorProfile',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('sponsorPanel', {sp_content:"sp_profile"});
			Session.set("sp_activeMenu","sp_profile");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/sponsor/company', {
	name: 'SponsorCompany',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('sponsorPanel', {sp_content:"sp_company"});
			Session.set("sp_activeMenu","sp_company");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/sponsor/teams', {
	name: 'SponsorTeams',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('sponsorPanel', {sp_content:"sp_teams"});
			Session.set("sp_activeMenu","sp_teams");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/sponsor/devs', {
	name: 'SponsorDevs',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('sponsorPanel', {sp_content:"sp_devs"});
			Session.set("sp_activeMenu","sp_devs");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/volunteer', {
	name: 'VolunteerPanel',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('volunteerPanel', {vp_content:"vp_overview"});
			Session.set("vp_activeMenu","vp_overview");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/volunteer/profile', {
	name: 'VolunteerProfile',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('volunteerPanel', {vp_content:"vp_profile"});
			Session.set("vp_activeMenu","vp_profile");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/dashboard/volunteer/shifts', {
	name: 'VolunteerShifts',
  	action() {
		if ( Meteor.userId() )
		{
			BlazeLayout.render('volunteerPanel', {vp_content:"vp_shifts"});
			Session.set("vp_activeMenu","vp_shifts");
		}
		else
			FlowRouter.go("Login");
  	},
});

FlowRouter.route('/contact', {
  	name: 'Contact',
  	action() {
		BlazeLayout.render('contact');
  	},
});

FlowRouter.route('/login', {
	name: 'Login',
	action() {
		if ( Meteor.userId() )
			FlowRouter.go("Dashboard");
		else
			BlazeLayout.render('login');
	},
});

FlowRouter.route('/signup', {
	name: 'SignUp',
	action() {
		if ( Meteor.userId() )
			FlowRouter.go("Dashboard");
		else
			BlazeLayout.render('signup', {signup_content:"signupForm"});
	},
});

FlowRouter.route('/signup/roles', {
	name: 'SignUpRoles',
	action() {
		//console.log( userHasRole(Meteor.userId()));
		if ( !Meteor.userId() )
			FlowRouter.go("SignUp");
		else
			BlazeLayout.render('signup', {signup_content:"signupRoles"});
	},
});

FlowRouter.route('/dev/:username', {
	name: 'DevProfileDisplay',
	action() {
		BlazeLayout.render('dev_profile');
	},
});

FlowRouter.route('/volunteer/:username', {
	name: 'VolunteerProfileDisplay',
	action() {
		BlazeLayout.render('volunteer_profile');
	},
});

FlowRouter.route('/team/:number', {
	name: 'TeamDisplay',
	action() {
		BlazeLayout.render('team_profile');
	},
});

FlowRouter.route('/company/:short', {
	name: 'CompanyProfileDisplay',
	action() {
		BlazeLayout.render('company_profile');
	},
});

FlowRouter.route('/sponsor/:username', {
	name: 'SponsorProfileDisplay',
	action() {
		BlazeLayout.render('sponsor_profile');
	},
});

FlowRouter.notFound = {
  	action() {
		BlazeLayout.render('App_body', { main: 'App_notFound' });
  	},
};

// Accounts Routing

FlowRouter.route('/logout',{
	name: 'Logout',
	action(){
		AccountsTemplates.logout();
		FlowRouter.redirect('/login');
	},
});

FlowRouter.route( '/verify-email/:token', {
	name: 'verify-email',
	action( params ) {
		Accounts.verifyEmail( params.token, ( error ) =>{
			if ( error ) {
				alert( error.reason, 'danger' );
			} else {
				alert( TAPi18n.__('verify-success'), 'success' );
				FlowRouter.go( '/login' );
			}
		});
	}
});

FlowRouter.route( '/reset-password/:token', {
	name: 'reset-password',
	action( params ) {
		AccountsTemplates.paramToken = params.token ;
		BlazeLayout.render('resetPassword');
	}
});

