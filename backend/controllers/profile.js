const handleProfileGet = async (req, res, database) => {
   const { id } = req.params;

   try {
      const user = await database("users").where({ id }).first();

      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
   } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
   }
};

export default handleProfileGet;