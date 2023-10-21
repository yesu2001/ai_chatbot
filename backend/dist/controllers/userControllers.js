import User from "../models/User.js";
import { hash } from "bcrypt";
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
export const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExits = await User.findOne({ email });
        console.log(userExits);
        if (userExits) {
            return res.status(200).json({ message: "user already exists" });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
//# sourceMappingURL=userControllers.js.map