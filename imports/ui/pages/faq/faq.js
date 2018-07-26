import './faq.html';

Template.faq.onCreated(function () {
	this.menuActive = new ReactiveVar( 0 );
});

Template.faq.onRendered( function(){
	
	window.scrollTo(0,0);

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
	/*
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
	*/

})

Template.faq.helpers({
	isMenuActive(opt)
	{
		//console.log(opt);
		if (opt == Template.instance().menuActive.get())
			return "menu-active";
		else
			return "menu-hover";
	}
});

Template.faq.events({
	'click #open-menu': function(){
		$("#open-menu").hide("fade", 200, function(){
			$("#menu-col").show("slide", {direction:"right"}, 1000, function(){
				$("#close-menu").show("fade",200);
			});
		});
	},

	'click #close-menu': function(){
		$("#close-menu").hide("fade", 200, function(){
			$("#menu-col").hide("slide", {direction:"right"}, 1000, function(){
				$("#open-menu").show("fade",200);
			});
		});
	},

  	'click #scroll-landing': function(){
    	$('html, body').animate({
        	scrollTop: $("#landing-1").offset().top 
    	}, 1000);
	},

	'click #menu-goindex': function() {
		FlowRouter.go("Index");
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
			console.log("here");
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
	},
});
