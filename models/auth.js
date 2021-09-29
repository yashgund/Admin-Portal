module.exports = {
    ensure: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/user/login');
    },
    forward: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/user/dashboard');      
    }
  };
  