import responseHandler from "../handlers/responseHandler.js";
import favoriteModel from "../models/favorite.js";

const addFavorite = async (req, res) => {
    try {
        
        const isFavorite = await favoriteModel.findOne({
            userId: req.user._id,
            mediaId: req.body.mediaId
        });
        
        if (isFavorite) return responseHandler.ok(res, isFavorite);

        const favorite = await favoriteModel.create({
            ...req.body,
            user: req.user._id
        });

        await favorite.save();

        responseHandler.created(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        const favorite = await favoriteModel.findById({
            user: req.user._id,
            _id: favoriteId
        });

        if (!favorite) return responseHandler.notFound(res);

        await favorite.remove();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({ user: req.user._id }).sort("-createdAt");

        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};


export default {
    addFavorite,
    removeFavorite,
    getFavoritesOfUser
};
