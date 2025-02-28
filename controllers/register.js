const handleRegister = async (req, res, database, bcrypt) => {
   const { email, fname, lname, password } = req.body;
   const saltRounds = 10;

   if (!email || !fname || !lname || !password) {
      return res.status(400).json("Missing registration fields");
   }

   try {
      const existingUser = await database("users").where({ email }).first();

      if (existingUser) {
         return res.status(400).json("Email already registered");
      }

      const hash = await bcrypt.hash(password, saltRounds);

      const newUser = await database.transaction(async (trx) => {
         try {
            const insertedUsers = await trx("users")
               .insert({ fname, lname, email, joined: new Date() })
               .returning("*");

            await trx("login").insert({ email, hash }).transacting(trx);

            return insertedUsers[0];
         } catch (error) {
            await trx.rollback();
            throw error;
         }
      });

      res.json(newUser);
   } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json("Error registering user");
   }
};

export default handleRegister;