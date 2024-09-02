const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10); // Specify salt rounds for bcrypt
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        
        res.status(201).json({ message: "SignUp Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const { password: _, ...others } = user._doc;
        res.status(200).json({ others });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during sign-in" });
    }
});

module.exports = router;
