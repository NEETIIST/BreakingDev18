getUserLanguage = function () {
    // Put here the logic for determining the user language
    return "pt";
};

getUserLanguageT9n = function () {
    return "pt-PT";
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);

        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
            })
            .fail(function (error_message) {
                // Handle the situation
                console.log(error_message);
            });
    });

  T9n.setLanguage(getUserLanguageT9n());
}