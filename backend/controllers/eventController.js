const Event = require("../models/Event");


exports.createEvent = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;

    let createdBy, createdByModel;

    if (req.user.role === "admin") {
      createdBy = req.user.organizationId;   // Organization ID
      createdByModel = "Organization";
    } else {
      createdBy = req.user.userId;            // Employee ID
      createdByModel = "Employee";
    }

    const event = await Event.create({
      title,
      description,
      eventDate,
      organization: req.user.organizationId,
      createdBy,
      createdByModel
    });

    res.status(201).json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      organization: req.user.organizationId
    })
      .populate("createdBy");

    res.json(events);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= UPDATE EVENT ================= */
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.eventDate = eventDate ?? event.eventDate;

    await event.save();

    res.json({
      message: "Event updated successfully",
      event
    });
  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE EVENT ================= */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    res.json({
      message: "Event deleted successfully"
    });
  } catch (err) {
    console.error("DELETE EVENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


