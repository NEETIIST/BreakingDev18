import './footer.html';

Template.footer.helpers({
	isActiveLanguage(lang)
	{
		let cur = TAPi18n.getLanguage();
		if (cur == lang)
			return "fw-6";
		else
			return "fw-4";
	}
});

Template.footer.events({
	"click #lang-PT": function(){
		console.log("here");
		TAPi18n.setLanguage("pt");
		T9n.setLanguage("pt-PT");
	},
	"click #lang-EN": function(){
		console.log("there");
		TAPi18n.setLanguage("en");
		T9n.setLanguage("en");
	},
});

	