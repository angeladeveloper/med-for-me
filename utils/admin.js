const withAdmin = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.permission) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAdmin;
  