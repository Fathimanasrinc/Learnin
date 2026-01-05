import express from "express";
import Request from "../models/Requests.js";
import protect from "../middleware/auth.js";

const router = express.Router();


router.get("/mytask", protect, async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.user._id);
    const requests = await Request.find({
      "mentor.userId": req.user._id,
      status: { $in: ["accepted", "completing"] }
    });

    console.log("REQUESTS FOUND:", requests);

    res.status(200).json(requests);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/mypendingtasks", protect, async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.user._id);
    const requests = await Request.find({
      "mentor.userId": req.user._id,
      status: "pending"
    });

    console.log("REQUESTS FOUND:", requests);

    res.status(200).json(requests);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    console.log(request,"requests")

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ Only mentor can accept
    if (request.mentor.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "completing";
    await request.save();

    res.status(200).json({
      message: "Completing request is pending",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    console.log(request,"requests")

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
res.status(200).json(request);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;