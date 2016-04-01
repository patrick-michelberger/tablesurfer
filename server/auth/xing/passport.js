var passport = require('passport');
var XingStrategy = require('passport-xing').Strategy;

exports.setup = function(User, config) {
    passport.use(new XingStrategy({
        consumerKey: config.xing.apiKey,
        consumerSecret: config.xing.apiSecret,
        callbackURL: config.xing.callbackURL,
        profileFields: ['id', 'first_name', 'last_name', 'active_email']
    }, function(token, tokenSecret, profile, done) {
        console.log("linkedin profile: ", profile);
        User.findOne({
                'xing.id': profile.id
            },
            function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    var jsonObj = {
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        role: 'user',
                        provider: 'xing',
                        linkedin: profile._json
                    };

                    user = new User(jsonObj);
                    user.save(function(err) {
                        if (err) done(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            })
    }));
};
