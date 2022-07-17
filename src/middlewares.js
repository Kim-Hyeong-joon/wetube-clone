export const localsMiddleware = (req, res, next) => {
  console.log(req.session.user, req.session.loggedIn);
  res.locals.loggedIn = Boolean(req.session.loggedIn); // session의 loggedIn value를 locals.loggedIn에 넣기
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; // 로그인 된 user를 보내거나 없으면 빈 object를 보낸다.
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
