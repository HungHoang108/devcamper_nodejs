const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = async (req, res, next) => {
  try {
    let query = req.query;
    let queryStr = JSON.stringify(query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    console.log(queryStr);

    const bootcamps = await Bootcamp.find(JSON.parse(queryStr));

    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBootcamp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Bootcamp.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
