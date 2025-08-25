const { validationResult } = require('express-validator');
const{ Team }= require('../Models/Schema_model.js');



//create, read, update, and delete teams

const getAllTeams= async (req, res) => {
  try {
    const query = req.query;
    const limit=query.limit || 10
    const page = query.page || 1; //1 is default
    const skip=(page-1)*limit
  
    const Teams = await Team.find({}).limit(limit).skip(skip);
    res.json({ status: "success", data: { Teams } });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};



// read a team
const getOneTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        status: "fail",
        data: { id: "team not found" }
      });
    }
    res.json({ status: "success", data: { team } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//  Create new team
const createTeam = async (req, res) => {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    res.status(201).json({ status: "success", data: { team: savedTeam } });
};


//  Update team
const updateTeam = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", data: { errors: errors.array() } });
  }

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
     
    );

    if (!updatedTeam) {
      return res.status(404).json({
        status: "fail",
        data: { id: "team not found" }
      });
    }

    res.json({ status: "success", data: { team: updatedTeam } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//  Delete team
const deleteTeam = async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        data: { id: "team   not found" }
      });
    }
    res.json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllTeams,
  getOneTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
