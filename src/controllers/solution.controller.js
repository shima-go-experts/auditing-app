import Solution from "../models/Solution.model.js";

/* ---------------- CREATE SOLUTION (ADMIN) ---------------- */
export const createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);
    res.status(201).json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- GET SOLUTIONS (PUBLIC) ---------------- */
export const getSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find({ status: "published" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: solutions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- GET SINGLE SOLUTION ---------------- */
export const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }

    res.json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- UPDATE SOLUTION (ADMIN) ---------------- */
export const updateSolution = async (req, res) => {
  try {
    const solution = await Solution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: solution,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- DELETE SOLUTION (ADMIN) ---------------- */
export const deleteSolution = async (req, res) => {
  try {
    await Solution.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Solution deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
