const express = require('express');
const app = express();
const port = 3000; // You can change the port number to your preference
const mainRouter = require('./routes/mainRouter');
const session = require('express-session');
const config = require('./config/config.json')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt')
const cors = require('cors');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.idUsers);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(
  session({
    secret: config.secret_key,
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
