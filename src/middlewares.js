export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // session의 loggedIn value를 locals.loggedIn에 넣기
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  next();
};
