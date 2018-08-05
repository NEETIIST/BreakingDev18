import './email.html'

Template.ap_email.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var username = FlowRouter.getParam('username');
		$('input[name=user]').val(username);
		$('input[name=subject]').val("[BreakingDev] - ");
	});
});

Template.ap_email.events({
	'submit #ap-email': function(event){

		event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const user = target.user.value;
	    const s = target.subject.value;
	    const m = target.message.value;
	 
	    // Meteor Call Processing
	    Meteor.call("sendDevEmail", user, s, m, function (err, data) {
            if(err){
                alert("Error: " + err);
            }else{
                alert(TAPi18n.__('ap-email-success'));
                //FlowRouter.go("DevTeam");
            }
    	});
	 
	    // Clear form
	    target.subject.value = "[BreakingDev] - ";
	    target.message.value = '';

	}
});