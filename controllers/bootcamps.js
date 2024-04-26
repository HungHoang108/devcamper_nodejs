const Bootcamp = require("../models/Bootcamp");

let bootcamps = [];

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({ success: true, data: bootcamps });
};

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(404).json({ success: false, error: "Bootcamp not found" });
  }

  res.status(200).json({ success: true, data: bootcamp });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = async (req, res) => {
  const { id } = req.params;

  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(404).json({ success: false, error: "Bootcamp not found" });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.error(`Error updating bootcamp: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = async (req, res) => {
  const { id } = req.params;

  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(id);

    if (!bootcamp) {
      return res.status(404).json({ success: false, error: "Bootcamp not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(`Error deleting bootcamp: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
