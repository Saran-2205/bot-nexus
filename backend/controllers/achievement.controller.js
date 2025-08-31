import Achievement from "../models/achievement.model.js";

export const createAchievement = async (req, res) => {
    try {
        const {
            title,
            year,
            event,
            prize
        } = req.body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ error: "Title is required and must be a string." });
        }

        if (!year || typeof year !== "number") {
            return res.status(400).json({ error: "Year is required and must be a number." });
        }

        if (!event || typeof event !== "string" || !event.trim()) {
            return res.status(400).json({ error: "Event is required and must be a string." })
        }

        if (!prize || typeof prize !== "string" || !prize.trim()) {
            return res.status(400).json({ error: "Prize is required and must be a string." })
        }

        const newAchievement = new Achievement({
            title,
            year,
            event,
            prize
        });

        await newAchievement.save();
        res.status(201).json(newAchievement);

    } catch (error) {
        console.error("Error in createAchievement Controller", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
};

export const deleteAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAchievement = await Achievement.findByIdAndDelete(id);
        if (!deletedAchievement) {
            return res.status(404).json({ error: "Achievement not found." });
        }
        res.status(200).json({ message: "Achievement deleted successfully." });
    } catch (error) {
        console.error("Error in deleteAchievement Controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.status(200).json(achievements);
    } catch (error) {
        console.error("Error in getAchievements Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) return res.status(404).json({ message: "Achievement not found" });
        res.json(achievement);
    } catch (error) {
        console.error("Error in getAchievementById Controller", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!achievement) return res.status(404).json({ message: "Achievement not found" });
        res.json(achievement);
    } catch (error) {
        console.error("Error in updateAchievementById Controller", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}