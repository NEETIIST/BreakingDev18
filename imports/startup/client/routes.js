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
import '../../ui/pages/resetPassword/resetPassword.js';
import '../../ui/pages/not-found/not-found.js';

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
    BlazeLayout.render('adminPanel');
  },
});

FlowRouter.route('/dashboard', {
    name: 'Dashboard',
    action() {
        if ( Meteor.userId() )
            BlazeLayout.render('dashboard');
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
            BlazeLayout.render('signup');
    },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

// Accounts Routing

FlowRouter.route('/logout',{
    name: 'logout',
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

AccountsTemplates.configureRoute