const express = require('express');
const app = express();
const port = 3000;
const mainRouter = require('./routes/mainRouter');
const session = require('express-session');
const config = require('./config/config.json');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const cors = require('cors');
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');



passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt_secret_key
    },
    async (jwtPayload, done) => {
      try {
        // Find the user by ID
        const user = await User.findByPk(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'Invalid token' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());


app.use('/', mainRouter);





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
