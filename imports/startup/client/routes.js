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
    BlazeLayout.render('dashboard');
  },
});

FlowRouter.route('/contact', {
  name: 'Contact',
  action() {
    BlazeLayout.render('contact');
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
