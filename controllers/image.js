const handleImage = async (req, res, database) => {
   const { id } = req.body;

   try {
      const updatedUser = await database("users")
         .where({ id })
         .increment("entries", 1)
         .returning("*");

      if (updatedUser.length > 0) {
         res.json(updatedUser[0].entries);
      } else {
         res.status(404).json({ error: "User not found" });
      }
   } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Server error" });
   }
};

export default handleImage;