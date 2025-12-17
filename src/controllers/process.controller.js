import ProcessStep from "../models/ProcessStep.model.js";

/* ---------------- CREATE PROCESS STEP (ADMIN) ---------------- */
export const createProcessStep = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const step = await ProcessStep.create({ title, description });

    res.status(201).json({
      success: true,
      data: step,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- GET PROCESS STEPS (PUBLIC) ---------------- */
export const getProcessSteps = async (req, res) => {
  try {
    const steps = await ProcessStep.find().sort({ createdAt: 1 });

    res.json({
      success: true,
      data: steps,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- GET SINGLE PROCESS STEP ---------------- */
export const getProcessStepById = async (req, res) => {
  try {
    const step = await ProcessStep.findById(req.params.id);

    if (!step) {
      return res.status(404).json({
        success: false,
        message: "Process step not found",
      });
    }

    res.json({
      success: true,
      data: step,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- UPDATE PROCESS STEP (ADMIN) ---------------- */
export const updateProcessStep = async (req, res) => {
  try {
    const step = await ProcessStep.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!step) {
      return res.status(404).json({
        success: false,
        message: "Process step not found",
      });
    }

    res.json({
      success: true,
      data: step,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- DELETE PROCESS STEP (ADMIN) ---------------- */
export const deleteProcessStep = async (req, res) => {
  try {
    const step = await ProcessStep.findByIdAndDelete(req.params.id);

    if (!step) {
      return res.status(404).json({
        success: false,
        message: "Process step not found",
      });
    }

    res.json({
      success: true,
      message: "Process step deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
