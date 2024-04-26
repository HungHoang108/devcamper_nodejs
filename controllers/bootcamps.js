// controllers/bootcamps.js

// Example data (you would replace this with your actual data access layer)
let bootcamps = [];

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = (req, res) => {
  const exampleBootcamps = [
    { id: 1, name: "Bootcamp A", description: "Description A" },
    { id: 2, name: "Bootcamp B", description: "Description B" },
    { id: 3, name: "Bootcamp C", description: "Description C" },
  ];

  res.status(200).json({ success: true, data: exampleBootcamps });
};

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = (req, res) => {
  const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === req.params.id);

  if (!bootcamp) {
    return res.status(404).json({ success: false, error: "Bootcamp not found" });
  }

  res.status(200).json({ success: true, data: bootcamp });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = (req, res) => {
  const { name, description } = req.body;

  const newBootcamp = {
    id: Math.floor(Math.random() * 1000), // Example: Generate random ID (replace this with your actual ID generation logic)
    name,
    description,
  };

  bootcamps.push(newBootcamp);

  res.status(201).json({ success: true, data: newBootcamp });
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let bootcamp = bootcamps.find((bootcamp) => bootcamp.id === id);

  if (!bootcamp) {
    return res.status(404).json({ success: false, error: "Bootcamp not found" });
  }

  bootcamp = { ...bootcamp, name, description };

  res.status(200).json({ success: true, data: bootcamp });
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = (req, res) => {
  const { id } = req.params;

  const index = bootcamps.findIndex((bootcamp) => bootcamp.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Bootcamp not found" });
  }

  bootcamps.splice(index, 1);

  res.status(200).json({ success: true, data: {} });
};
