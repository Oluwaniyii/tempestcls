const router = require("express").Router();
const Login = require("./Login");
const LoginRepository = require("./Repository/User/UserRepository");
const AuthValidation = require("./AuthValidation");

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body["email"];
    const password = req.body["password"];
    const v = await AuthValidation.login(email, password);

    const repository = new LoginRepository();
    const login = new Login(repository);
    const action = await login.init(v.email, v.password);
    res.json(action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
