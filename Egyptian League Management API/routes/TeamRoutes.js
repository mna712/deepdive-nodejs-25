const express = require("express");
const TeamRouter = express.Router();
const { body } = require("express-validator");
const controllers = require("../controllers/TeamControllers.js");

TeamRouter.route("/")
  .get(controllers.getAllTeams)
  .post(
    [
      body("name")
        .notEmpty()
        .withMessage("name can not be empty")
        .isLength({ min: 2 }),
      body("city")
        .notEmpty()
        .withMessage("city can not be empty")
        .isLength({ min: 2 }),
      body("stadium")
        .notEmpty()
        .withMessage("stadium can not be empty")
        .isLength({ min: 2 }),
      body("foundedYear")
        .notEmpty()
        .withMessage("foundedYear can not be empty")
        .isNumeric()
        .withMessage("foundedYear must be a number"),
    ],
    controllers.createTeam
  );

TeamRouter.route("/:id")
  .get(controllers.getOneTeam)
  .patch(
    [
      body("name")
        .notEmpty()
        .withMessage("name can not be empty")
        .isLength({ min: 2 }),
      body("city")
        .notEmpty()
        .withMessage("city can not be empty")
        .isLength({ min: 2 }),
      body("stadium")
        .notEmpty()
        .withMessage("stadium can not be empty")
        .isLength({ min: 2 }),
      body("foundedYear")
        .notEmpty()
        .withMessage("foundedYear can not be empty")
        .isNumeric()
        .withMessage("foundedYear must be a number"),
    ],
    controllers.updateTeam
  )
  .delete(controllers.deleteTeam);

module.exports = TeamRouter;
