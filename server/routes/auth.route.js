/**
 *
 * @author Anass Ferrak aka "TheLordA" <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

const controller = require("../controllers/auth.controller");

module.exports = (app) => {
    // Route to handle SignUp requests
    // Accessible at: /api/auth/signup
    app.post("/signup", controller.signup);

    // Route to handle SignIn requests
    // Accessible at: /api/auth/signin
    app.post("/signin", controller.signin);

    // Route to handle Reset Passwords requests
    // Accessible at: /api/auth/reset-pwd
    app.post("/reset-pwd", controller.resetPwd);

    // Route to handle Create New Passwords requests
    // Accessible at: /api/auth/new-pwd
    app.post("/new-pwd", controller.newPwd);
};

