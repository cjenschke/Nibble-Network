const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Import teh 'ingredientsSearch.js router
const apiRouter = require('./controllers/api/ingredientsSearch');

// Import the 'ingredientsSearch.js' module
const { getRandomRecipes } = require('./controllers/api/homepageRecipes');

// Setup Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session with Sequelize store
app.use(
  session({
    secret: 'Super secret secret',
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 24 * 60 * 60 * 1000,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// Define routes after session middleware
const homeRoutes = require('./controllers/homeRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const registrationRoutes = require('./controllers/registrationRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const resultsRoutes = require('./controllers/resultsRoutes');
const recipeRoutes = require('./controllers/recipeRoutes');
const ingredientController = require('./controllers/ingredientController');

// Mount the 'apiRouter' at teh '/api' endpoint
app.use('/api', apiRouter); // Sets up the api search
app.use('/api', ingredientController);
app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/', registrationRoutes);
app.use('/', dashboardRoutes);
app.use('/', resultsRoutes);
app.use('/', recipeRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
