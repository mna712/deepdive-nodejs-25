const express = require('express');
const MatchRouter = express.Router();
const { body } = require('express-validator');
const controllers = require('../controllers/MatchControllers.js'); 

MatchRouter.route('/')
    .get(controllers.getAllMatches)
    .post(

        [
            body('homeTeam')
                .notEmpty().withMessage('homeTeam can not be empty')
                .isLength({ min: 2 }),
            body('awayTeam')
                .notEmpty().withMessage('awayTeam can not be empty')
                .isLength({ min: 2 }),
         
            body('matchDate')
                .notEmpty().withMessage('matchDate can not be empty')
                .isNumeric().withMessage('matchDate must be a number')
      ,  body('score')
                .notEmpty().withMessage('score can not be empty')
                .isLength({ min: 2 })   ],
                controllers.createMatch
    );

MatchRouter.route('/:id')
    .get(controllers.getOneMatch)
    .patch(
        [

            body('homeTeam')
                .notEmpty().withMessage('homeTeam can not be empty')
                .isLength({ min: 2 }),
            body('awayTeam')
                .notEmpty().withMessage('awayTeam can not be empty')
                .isLength({ min: 2 }),
            body('matchDate')
                .notEmpty().withMessage('matchDate can not be empty')
                .isLength({ min: 2 }),
            body('score')
                .notEmpty().withMessage('score can not be empty')
                .isString().withMessage('score must be a string')
        ],
        controllers.updateMatch
    )
    .delete(controllers.deleteMatch);

// "homeTeam": "united",
// "awayTeam": "city",
// "matchDate": "2023-10-01",
// "score": "2-1"