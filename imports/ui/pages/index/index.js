import './index.html';

//import '../../components/hello/hello.js';
//import '../../components/info/info.js';

Template.index.onCreated(function () {
	this.menuActive = new ReactiveVar( 0 );
});

Template.index.onRendered( function(){
	
	var temp = Template.instance()

	var w1 = new Waypoint({
		element: document.getElementById("landing-1"),
		handler: function(direction) {
			temp.menuActive.set(1);
		},
	});
	var w2 = new Waypoint({
		element: document.getElementById("landing-2"),
		handler: function(direction) {
			temp.menuActive.set(2);
		},
	});
	var w3 = new Waypoint({
		element: document.getElementById("landing-3"),
		handler: function(direction) {
			temp.menuActive.set(3);
		},
	});
	var w4 = new Waypoint({
		element: document.getElementById("landing-4"),
		handler: function(direction) {
			temp.menuActive.set(4);
		},
	});
	var w5 = new Waypoint({
		element: document.getElementById("landing-5"),
		handler: function(direction) {
			temp.menuActive.set(5);
		},
	});
	

})

Template.index.helpers({
	isMenuActive(opt)
	{
		//console.log(opt);
		if (opt == Template.instance().menuActive.get())
			return "menu-active";
		else
			return "menu-hover";
	}
});

Template.index.events({
  	'click #scroll-landing': function(){
    	$('html, body').animate({
        	scrollTop: $("#landing-1").offset().top 
    	}, 1000);
	},
	
	'click .scroll-menu': function(e,t)
	{
		let curopt = Template.instance().menuActive.get();
		let newopt = e.target.id ;
		newopt = parseInt(newopt.split("menu-opt-")[1]);
		//Template.instance().menuActive.set(newopt);
		let dir = 0;
		if ( newopt < curopt )
			dir = -2;
		else
			dir = 2;
		$('html, body').animate({
        	scrollTop: $("#landing-"+newopt).offset().top + dir
    	}, 1000);
	},
});
