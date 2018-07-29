import './index.html';

import '../../components/sidebar/logged.js';
import '../../components/sidebar/footer.js';

Template.index.onCreated(function () {
	this.menuActive = new ReactiveVar( 0 );
});

Template.index.onRendered( function(){
	
	window.scrollTo(0,0);
	$("html").css({ "overflow-y":"scroll" });
	
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
	var w6 = new Waypoint({
		element: document.getElementById("landing-6"),
		handler: function(direction) {
			temp.menuActive.set(6);
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
	'click #open-menu': function(){
		$("#open-menu").hide("fade", 200, function(){
			$("#menu-col").show("slide", {direction:"right"}, 1000, function(){
				$("#close-menu").show("fade",200);
			});
		});
		$("html").css({ "overflow-y":"hidden" });
	},

	'click #close-menu': function(){
		$("#close-menu").hide("fade", 200, function(){
			$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
				$("#open-menu").show("fade",200);
			});
		});
		$("html").css({ "overflow-y":"scroll" });
	},

  	'click #scroll-landing': function(){
    	$('html, body').animate({
        	scrollTop: $("#landing-1").offset().top + 1
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

		// Close Mobile just in case
		if ( $(window)[0].outerWidth < 768)
		{
			$("#close-menu").hide("fade", 200, function(){
				$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
					$("#open-menu").show("fade",200, function(){
						$('html, body').animate({
				        	scrollTop: $("#landing-"+newopt).offset().top + dir
				    	}, 1000);
					});
				});
			});
		}
		else
		{
			$('html, body').animate({
	        	scrollTop: $("#landing-"+newopt).offset().top + dir
	    	}, 1000);
		}
		$("html").css({ "overflow-y":"scroll" });
	},
});
