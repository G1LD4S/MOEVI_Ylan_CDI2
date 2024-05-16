const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");
const BoosterController = require("../controllers/BoosterController");
const CardsController = require("../controllers/CardsController");

const router = express.Router();
router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);
router.post("/login", AuthentificationController.login);
router.get(
    "/getMyProfile",
    AuthMiddleware.authenticate,
    UsersController.getMyProfile
);
router.post(
    "/user/booster/open",
    AuthMiddleware.authenticate,
    BoosterController.openBooster
);
router.put(
    "/user/booster/reset",
    AuthMiddleware.authenticate,
    BoosterController.resetBooster
);

router.get(
    "/user/cards",
    AuthMiddleware.authenticate,
    CardsController.getUserCards
);

module.exports = router;
