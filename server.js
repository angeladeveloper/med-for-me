const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
//require sequelize db
const sequelize = require('./config/connection');
// set up session to store cookie information and session information inside sql database. 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
//if you want, you can set up a custom port in your .env file. 
const PORT = process.env.PORT || 3001;




const sess = {
  secret: "I'm not telling, I'm not telling, hehehehehehehehehehehehe",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


// using the session we just created. 
app.use(session(sess));

// Inform Express.js on which template engine to use
// Set up Handlebars.js engine with custom helpers 
const handlebars = exphbs.create({ extname: '.hbs', });
// this makes it so we can use the .hbs instead of .handlebars.... which is way to much typing. 
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now 👂 on http://localhost:${PORT}`));
});
