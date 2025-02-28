const handleHome = async (req, res, database) => {
   try {
      const users = await database.select("*").from("users");
      res.json(users);
   } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
   }
};

export default handleHome;