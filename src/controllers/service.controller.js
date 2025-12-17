import Service from "../models/Service.model.js";

/* ---------------- CREATE SERVICE (ADMIN) ---------------- */
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ---------------- GET SERVICES (PUBLIC) ---------------- */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "published" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ---------------- GET SINGLE SERVICE ---------------- */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ---------------- UPDATE SERVICE (ADMIN) ---------------- */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ---------------- DELETE SERVICE (ADMIN) ---------------- */
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
