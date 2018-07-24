import './index.html';

//import '../../components/hello/hello.js';
//import '../../components/info/info.js';

Template.index.onCreated(function () {

});

Template.index.helpers({
  /*links() {
    return Links.find({});
  },*/
});

Template.index.events({
  	'click #scroll-landing': function(){
    	console.log("Scroll");
	}
});
