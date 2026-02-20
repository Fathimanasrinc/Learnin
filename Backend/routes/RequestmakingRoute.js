import express from "express";
import Request from "../models/Requests.js";
import User from "../models/User.js";
import protect from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// CREATE REQUEST
router.post("/", protect, async (req, res) => {
  const userId = req.user; // from JWT

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const { mentor, expectations, skills, deadline, credits } = req.body;
    const newRequest = new Request({
      mentor: {
        userId: mentor.userId,
        name: mentor.name,
        image: mentor.image,
      },
      // mentor user id

      learner: {
        userId: user._id,
        name: user.name,
        image: user.image,
      },

      expectations,
      skills: skills, // ✅ correct name
      deadline,
      credits,
    });
    console.log(newRequest);

    await newRequest.save();
    res.status(201).json({
      message: "Request created successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/myrequests", protect, async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.user._id);
    const requests = await Request.find({
      "learner.userId": req.user._id,
     status: { $in: ["pending", "completing"] },
    });

    console.log("REQUESTS FOUND", requests);

    res.status(200).json(requests);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/myacceptedrequests", protect, async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.user._id);
    const requests = await Request.find({
      "learner.userId": req.user._id,
      status: "accepted"
    });

    console.log("REQUESTS FOUND:", requests);

    res.status(200).json(requests);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.put("/accept/:id", protect, async (req, res) => {
  console.log("hihello");
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ Only mentor can accept
    if (request.mentor.userId.toString() !== req.user._id.toString()) {
      console.log("hi");
      return res.status(403).json({ message: "Not authorized" });
    }


    request.status = "accepted";
    await request.save();

    res.status(200).json({
      message: "Request accepted successfully",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      console.log("nor result");
      return res.status(404).json({ message: "Request not found" });
    }

   

    await Request.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Request declined and deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// routes/requestRoutes.js
router.get("/:id", protect, adminAuth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
