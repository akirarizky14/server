const catModels = require('../../models/productModels');
const productModels = require('../../models/productModels');

const postProducts = async (req,res) =>{
    try {
        const {title, photos, video, description, price, stars, thumbnail, file, created_at, created_by} = req.body;
        const user_id = req.user._id;

        const product = await productModels.create({
            user_id : user_id,
            title : title,
            photos : photos,
            video : video,
            description : description,
            price : price,
            stars : stars,
            thumbnail : thumbnail,
            file : file,
            created_at : created_at,
            created_by : created_by
        })

        res.status(200).json(product)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {postProducts}