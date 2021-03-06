import { AccountsTemplates } from 'meteor/useraccounts:core';
import { TAPi18n } from 'meteor/tap:i18n';

AccountsTemplates.configure({
	// Behavior
	confirmPassword: true,
	enablePasswordChange: true,
	forbidClientAccountCreation: false,
	overrideLoginErrors: true,
	sendVerificationEmail: true,
	lowercaseUsername: false,
	focusFirstInput: true,

	// Appearance
	showAddRemoveServices: false,
	showForgotPasswordLink: true,
	showLabels: true,
	showPlaceholders: false,
	showResendVerificationEmailLink: false,
	hideSignInLink: true,
	hideSignUpLink: true,

	// Client-side Validation
	continuousValidation: false,
	negativeFeedback: false,
	negativeValidation: false,
	positiveValidation: false,
	positiveFeedback: false,
	showValidating: false,

	// Redirects
	homeRoutePath: '/',
	redirectTimeout: 4000,

});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "username",
		required: true,
		minLength: 5,
	},
	{
		_id: 'email',
		type: 'email',
		required: true,
		displayName: "email",
		re: /.+@(.+){2,}\.(.+){2,}/,
		errStr: 'Invalid email',
	},
	pwd
]);

AccountsTemplates.configure({
	onSubmitHook: ( error, state ) => {
		if ( !error && (state === 'signIn') ) {
			// login successful, route to index
			FlowRouter.redirect("/dashboard");
		}
		else if ( !error && ( state === 'signUp') ) {
			// signup successful, route to roles
			FlowRouter.redirect("/signup/roles");
		}
	},
	onLogoutHook: ( error, state ) => {
		FlowRouter.redirect('/login');
	},
});

Accounts.emailTemplates.siteName = "BreakingDev";
Accounts.emailTemplates.from     = "BreakingDev<no-reply@breakingdev.pt>";

Accounts.emailTemplates.verifyEmail = {
	subject() {
			return "BreakingDev - Verificação de email";
	},
	text( user, url ) {
			let emailAddress   = user.emails[0].address,
					urlWithoutHash = url.replace( '#/', '' ),
					supportEmail   = "breakingdev@neeti.tecnico.ulisboa.pt",
					emailBody      = `Bem-vindo ao BreakingDev!\n\nPara verificares o teu email (${emailAddress}) segue este link:\n\n${urlWithoutHash}\n\nSe recebeste este email por engano, agradecemos que o apagues.\nCaso tenhas alguma dúvida, envia-nos um email para: ${supportEmail}.`;

			return emailBody;
	}
};

Accounts.emailTemplates.resetPassword = {
	subject() {
			return "BreakingDev - Recuperação de Password";
	},
	text( user, url ) {
			let username   = user.username,
					urlWithoutHash = url.replace( '#/', '' ),
					supportEmail   = "breakingdev@neeti.tecnico.ulisboa.pt",
					emailBody      = `Parece que te esqueceste da tua password, ${username}.\n\nPara recuperares o acesso à tua conta segue este link:\n\n${urlWithoutHash}\n\nSe recebeste este email por engano, agradecemos que o apagues.\nCaso tenhas alguma dúvida, envia-nos um email para: ${supportEmail}.`;

			return emailBody;
	}
};

Accounts.onLogin(function(){
	//console.log("Here");
	FlowRouter.go("Dashboard");
})

Accounts.onLogout(function(){
	//FlowRouter.go("Index");	
})

Meteor.users.after.insert(function (userId, doc) {
  	Roles.addUsersToRoles(doc._id, ['nothing']);
});