class auth {

  static isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
    request.flash("error", "No autorizado, debe iniciar sesión")
    return response.redirect('/signin');
  };

  static isAdmin(request, response, next) {
    if (request.isAuthenticated() && request.user.admin === true) {
      return next();
    }
    request.flash("error", "No autorizado, debe ser administrador")
    return response.redirect('/home');
  }

}

export default auth;