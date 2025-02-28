const handleSignin = async (req, res, database, bcrypt) => {
   const { email, password } = req.body;

   try {
      const loginEntry = await database("login").select("hash", "email").where({ email }).first();

      if (!loginEntry) {
         return res.status(400).json("error logging in");
      }

      const isValid = await bcrypt.compare(password, loginEntry.hash);

      if (isValid) {
         const user = await database("users").select("*").where({ email }).first();
         res.json(user);
      } else {
         res.status(400).json("error logging in");
      }
   } catch (err) {
      console.error("Signin error:", err);
      res.status(500).json("server error");
   }
};

export default handleSignin;