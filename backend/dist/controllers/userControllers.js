import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
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
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createToken(userExits._id, userExits.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExits = await User.findOne({ email });
        if (!userExits) {
            return res.status(401).json({ message: "User Does not exist!" });
        }
        const isPasswordCorrect = await compare(password, userExits.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Passwords do not match!" });
        }
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });
        const token = createToken(userExits._id, userExits.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "ok", id: userExits._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
//# sourceMappingURL=userControllers.js.map