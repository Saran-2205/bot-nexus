import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ error: "Name is required and must be a string." });
    }
    if (email && !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ error: "Invalid Gmail address." });
    }
    if (message && typeof message !== "string")
      return res.status(400).json({ error: "Message must be a string." });

    const newFeedback = new Feedback({
        name,
        email,
        message
    })

    await newFeedback.save();

    res.status(201).json({
        message:"Feedback created successfully",
        Feedback: newFeedback,
    })
  } catch (error) {
    console.error("Error in createFeedback Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json({
      message: "All Feedbacks fetched successfully",
      feedbacks,
    });
  } catch (error) {
    console.error("Error in getAllFeedbacks Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFeedback = async (req,res) => {
  try {
    const { param: id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Feedback ID is required." });
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found." });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
      deletedFeedback,
    });
  } catch (error) {
    console.error("Error in deleteFeedback Controller",error);
    res.status(500).json({error:"Internal server error"});
  }
}
