var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

exports.setup = function(User, config) {
    passport.use(new LinkedInStrategy({
        consumerKey: config.linkedin.apiKey
        consumerSecret: config.linkedin.secretKey,
        callbackURL: config.linkedin.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'headline']
    }, function(token, tokenSecret, profile, done) {
        console.log("linkedin profile: ", profile);
        User.findOne({
                'linkedin.id': profile.id
            },
            function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        first_name: profile.name.firstName,
                        last_name: profile.name.lastName,
                        role: 'user',
                        provider: 'linkedin',
                        picture: 'http://api.linkedin.com/v1/people/' + profile.id + '/picture-url',
                        facebook: profile._json
                    });
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
