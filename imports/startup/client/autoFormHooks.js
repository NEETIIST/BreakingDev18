AutoForm.addHooks(['contactForm'],{
    onSuccess: function(formType, result) {
        alert(TAPi18n.__('contact-success'));
        FlowRouter.go("/");
    }
});

AutoForm.debug();