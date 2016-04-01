var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

exports.setup = function(User, config) {
    passport.use(new LinkedInStrategy({
        consumerKey: config.linkedin.apiKey,
        consumerSecret: config.linkedin.apiSecret,
        callbackURL: config.linkedin.callbackURL,
        profileFields: [
            'id',
            'first-name',
            'last-name',
            'maiden-name',
            'public-profile-url',
            'formatted-name',
            'phonetic-first-name',
            'phonetic-last-name',
            'formatted-phonetic-name',
            'headline',
            'location',
            'industry',
            'current-share',
            'num-connections',
            'num-connections-capped',
            'summary',
            'specialties',
            'positions',
            'picture-urls::(original)',
            'picture-url',
            'site-standard-profile-request',
            'api-standard-profile-request'
        ]
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
                    var jsonObj = {
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        role: 'user',
                        provider: 'linkedin',
                        linkedin: profile._json
                    };

                    if (profile._json.pictureUrls && profile._json.pictureUrls.values && profile._json.pictureUrls.values[0]) {
                        jsonObj.picture = profile._json.pictureUrls.values[0];
                    }

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
