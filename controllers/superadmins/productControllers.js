const productModels = require('../../models/productModels');

const postProducts = async (req, res) => {
    try {
        const { title, product_id, photos, video, description, price, stars, thumbnail, file } = req.body;
        const user_id = req.user._id;
        const created_byU = req.user.full_name;

        const validCategories = ['Test', 'Hard', 'Soft', 'Consultation', 'Coaching'];

        if (!validCategories.includes(product_id)) {
            return res.status(400).json({ error: "Invalid Categories" });
        }

        const product = await productModels.create({
            user_id: user_id,
            product_id : product_id,
            title: title,
            photos: photos,
            video: video,
            description: description,
            price: price,
            stars: stars,
            thumbnail: thumbnail,
            file: file,
            created_at: Date.now(),
            created_by: created_byU
        });

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllProducts = async (req,res) =>{
    try {
        const getAll = await productModels.find();
        res.status(200).json(getAll)
    } catch (error) {
        res.status(500).json({error: "Can't get All Products"})
    }
}
module.exports = { postProducts ,getAllProducts};
