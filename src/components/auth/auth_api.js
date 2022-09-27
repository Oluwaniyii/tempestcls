const router = require("express").Router();
const authValidation = require("./authValidation");
const SessionRepository = require("./Repository/Session/SessionRepository");
const Session = require("./Session");
const UserRepository = require("./Repository/User/UserRepository");
const Login = require("./Login");
const CreateAccount = require("./CreateAccount");

/**
 * Dependency Injectors help manage storage by creating dependencies once and providing them throught application lifecycle
 * I cant be sure just how efficient this is but its obviously better than  having to create new dependency object in every route
 */
const sessionRepository = new SessionRepository();
const session = new Session(sessionRepository);
const userRepository = new UserRepository();

router.post("/login", async (req, res, next) => {
  try {
    const login = new Login(userRepository, session);
    const v = await authValidation.login(req.body);

    const action = await login.init(v.email, v.password);
    res.json(action);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const createAccount = new CreateAccount(userRepository);
    const v = await authValidation.create(req.body);

    const action = await createAccount.init(v.username, v.email, v.password);
    res.json(action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
