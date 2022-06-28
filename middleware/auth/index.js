import { User } from "../../models/index.js";
const JWT_SECRET = "abc123";

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) return res.status(404).send({ errors: ["Invalid email or password"] });

    req.session.user = user;

    req.session.save((err) => {
      if(err) {
        console.log('Couldnt save user', err)
        throw err;
      }

      return res.status(201).send(user);
    })
  } catch (e) {
    return next(e);
  }
}

export async function logout(req, res, next) {
  try {
    req.session.destroy((err) => {
      if(err) throw err;

      return res.status(201).send({ success: true })
    })
  } catch(e) {
    return next(e)
  }
}

export async function verifySession(req, res, next) {
  let hasConnectCookie = false;
  try {
    const cookie = req.cookies['eternal'];
    
    console.log(cookie.includes(req.sessionID))
    hasConnectCookie = cookie.includes(req.sessionID); //req.cookies[COOKIE_NAME].includes(req.sessionID)
  } catch (e) {
    return next(new Error("No auth cookie"));
  }
  
  if (!hasConnectCookie) {
    return next("no auth cookie");
  }
  
  // if there is no user on the session then the user never logged in
  // or hasnt logged in since resetting password
  if (!req.session.user) {
    return next("no session user");
  }
  
  // Refreshes the session
  req.session.touch();
  
  delete req.session.user.password;

  return next();
}

export async function authenticateAndGetUser(req, res, next) {
  let hasConnectCookie = false;
  try {
      const cookie = req.cookies["eternal"]

      hasConnectCookie = cookie.includes(req.sessionID)//req.cookies[COOKIE_NAME].includes(req.sessionID)
  } catch(e) {
      return next(new Error('No auth cookie'))
  }

  if(!hasConnectCookie) {
      return next('no auth cookie')
  }

  // if there is no user on the session then the user never logged in
  // or hasnt logged in since resetting password
  if(!req.session.user) {
      return next('no session user')
  }

  // Basically refreshes the session
  req.session.touch()

  delete req.session.user.password
  // res.locals.user = req.session.user

  return res.send(req.session.user)
}
