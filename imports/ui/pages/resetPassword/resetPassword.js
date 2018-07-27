import './resetPassword.html'

Template.resetPassword.onRendered( function(){
	window.scrollTo(0,0);
	$("#menu-signup").removeClass("menu-active").addClass("menu-hover");
	$("#menu-login").removeClass("menu-active").addClass("menu-hover");

	if (AccountsTemplates.paramToken) {
  		Session.set('resetPassword', AccountsTemplates.paramToken);
	}

})

Template.resetPassword.helpers({
	resetPassword: function(){
		return Session.get('resetPassword');
 	}
});

Template.resetPassword.events({
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

	'click #menu-goindex': function() {
		FlowRouter.go("Index");
	},

	'submit #resetPasswordForm': function(e, t) {
		e.preventDefault();

		var resetPasswordForm = $(e.currentTarget),
			password = resetPasswordForm.find('#at-field-password').val(),
			passwordConfirm = resetPasswordForm.find('#at-field-password_again').val();

		if ( (password.length != 0 ) && isValidPassword(password, passwordConfirm)) {
			Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
				if (err) {
					alert(err);
				} else {
					alert(TAPi18n.__('rp_success'));
					Session.set('resetPassword', null);
				}
			});
		}

		FlowRouter.go("Dashboard");
	}
	
});

var isValidPassword = function(password, passwordConfirm) {
	if (password === passwordConfirm) {
		//console.log('passwordVar.length'+ password.length >= 6 ? true : false);
	 	return password.length >= 6 ? true : false;
	} else {
	  	alert("Wrong");
	 	return false ;
	}
}
