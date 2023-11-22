// server.js:
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Range helper function
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

// Setup Handlebars
app.engine(
  'handlebars',
  engine({
    helpers: {
      range, // Register the range helper
    },
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

// Middleware for logging requests
app.use((req, res, next) => {
  console.log('Request Type:', req.method);
  console.log('Request URL:', req.originalUrl);
  console.log('Request Body:', req.body);
  next();
});

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Session middleware with Sequelize store
app.use(session({
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport middleware after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const homeRoutes = require('./controllers/homeRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const registrationRoutes = require('./controllers/registrationRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const resultsRoutes = require('./controllers/resultsRoutes');
const recipeRoutes = require('./controllers/recipeRoutes');
const logoutRoutes = require('./controllers/logoutRoutes');
const ingredientController = require('./controllers/ingredientController');
const ingredientsSearchRoutes = require('./controllers/api/ingredientsSearch');

// Mount routers
app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/', registrationRoutes);
app.use('/', dashboardRoutes);
app.use('/', resultsRoutes);
app.use('/', recipeRoutes);
app.use('/', logoutRoutes);
app.use('/api', ingredientController);
app.use('/api', ingredientsSearchRoutes);


// Database synchronization and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});