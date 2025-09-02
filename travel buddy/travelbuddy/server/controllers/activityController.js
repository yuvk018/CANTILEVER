import Activity from "../models/Activity.js";

export const createActivity = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.user.uid,
      participants: [req.user.uid],
    };
    const act = await Activity.create(payload);
    return res.status(201).json(act);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    return res.json(activities);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const act = await Activity.findById(req.params.id);
    if (!act) return res.status(404).json({ message: "Not found" });
    return res.json(act);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const joinActivity = async (req, res) => {
  try {
    const act = await Activity.findById(req.params.id);
    if (!act) return res.status(404).json({ message: "Not found" });
    if (!act.participants.includes(req.user.uid)) {
      act.participants.push(req.user.uid);
      await act.save();
    }
    return res.json(act);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
