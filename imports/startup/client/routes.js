import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/index/index.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Index',
  action() {
    BlazeLayout.render('index');
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
