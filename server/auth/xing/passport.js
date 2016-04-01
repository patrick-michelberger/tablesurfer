var passport = require('passport');
var XingStrategy = require('passport-xing').Strategy;

exports.setup = function(User, config) {
    passport.use(new XingStrategy({
        consumerKey: config.xing.apiKey,
        consumerSecret: config.xing.apiSecret,
        callbackURL: config.xing.callbackURL,
        profileFields: ['id', 'first_name', 'last_name', 'active_email', 'photo_urls']
    }, function(token, tokenSecret, profile, done) {
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
                        email: profile._json.active_email,
                        verified: true,
                        picture: profile._json.photo_urls.size_1024x1024,
                        role: 'user',
                        provider: 'xing',
                        xing: profile._json
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
