const { validationResult } = require('express-validator');
const {Match} = require('../Models/Schema_model.js');



//create, read, update, and delete matches

const getAllMatches = async (req, res) => {
  try {
    const query = req.query;
    const limit=query.limit || 10
    const page = query.page || 1; //1 is default
    const skip=(page-1)*limit

    const Matches = await Match.find({}).limit(limit).skip(skip);
    res.json({ status: "success", data: { Matches } });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getOneMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({
        status: "fail",
        data: { id: "match not found" }
      });
    }
    res.json({ status: "success", data: { match } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//  Create new match
const createMatch = async (req, res) => {
    const match = new Match(req.body);
    const savedMatch = await match.save();
    res.status(201).json({ status: "success", data: { match: savedMatch } });
};

//  Update match
const updateMatch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", data: { errors: errors.array() } });
  }

  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
    );

    if (!updatedMatch) {
      return res.status(404).json({
        status: "fail",
        data: { id: "Match not found" }
      });
    }

    res.json({ status: "success", data: { match: updatedMatch } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//  Delete match
const deleteMatch = async (req, res) => {
  try {
    const deleted = await Match.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        data: { id: "Match not found" }
      });
    }
    res.json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllMatches,
  getOneMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};
