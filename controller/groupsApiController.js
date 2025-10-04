import Group from "../models/Group.js";

//POST

export const postNewGroup = async (req, res) => {
  try {
    const newGroup = Group.create(req.body);
    res.json(newGroup);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//GET

export const getAllGroups = async (req, res) => {
  try {
    const groupList = await Group.find();
    res.json(groupList);
  } catch (error) {
    res.json({ error: error.message });
  }
};
