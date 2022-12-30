import userModel from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/responseHandler.js";


const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({ username });

        if (checkUser) return responseHandler.badRequest(res, "Username already exists");

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user._id,

        });

    } catch {
        return responseHandler.error(res);
    }
};

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("username password salt id displayName");

        if (!user) return responseHandler.badRequest(res, "User not exists");

        if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Password is incorrect");

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user._id,
        });

    } catch {
        responseHandler.error(res);
    }
};

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.id).select("password id salt");
        
        if (!user) return responseHandler.unauthorized(res);
        
        if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Password is incorrect");

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);

    } catch {
        responseHandler.error(res);
    }
};

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) return responseHandler.notFound(res);

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};


export default {
    signup,
    signin,
    updatePassword,
    getInfo,
};
