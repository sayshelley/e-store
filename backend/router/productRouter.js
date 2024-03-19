import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import product from '../model/product.js';


const productRoute = express.Router();

productRoute.get('/', async (req, res) => {

    const allProducts = await product.find();
    res.send(allProducts);
}

);

productRoute.get("/search", async (req, res) => {
 
  const category = req.query.category || "";
  const brand = req.query.brand || "";
  
  const findByCategory= category && category !== "all" ? { category } : {};
  const findByCategoryBrand = brand && brand !== "all" ? { brand } : {};

  const item = await product.find({
    ...findByCategory,
    ...findByCategoryBrand,
  }); 

  if (item){
    res.send(item);
  }
  else {
    res.status (404).send ({message: 'Cannot find the product'});
  }
});  

productRoute.get("/categories", async (req, res) => {
  const categories = await product.distinct("category");
  res.send(categories);
});

productRoute.get("/brands", async (req, res) => {
  const brands = await product.distinct("brand");
  res.send(brands);
});

productRoute.post(
  '/:id/reviews',
  
  expressAsyncHandler(async (req, res) =>{
    const productId = req.params.id;
    const product_tmp = await product.findById(productId);
    if (product_tmp){
      const review = {
        comment:req.body.comment,
      };
      product_tmp.reviews.push (review);
      product_tmp.peopleReviews = product_tmp.reviews.length;
      const updatedProduct = await product_tmp.save();
      res.status(201).send({
        message:'review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length-1],
        peopleReviews: product_tmp.peopleReviews,

        
      });
      
    } else {
      res.status(404).send ({message:'product not found'});
    }
  })
)


productRoute.get('/:id', async(req, res) => {
    const item = await product.findById(req.params.id); //x => x._id === 
    if (item){
      res.send(item);
    }
    else {
      res.status (404).send ({message: 'Cannot find the product'});
    }
  
  });
  
  
productRoute.get('/tag/:tag', async(req, res) => {
    const item = await product.findOne({tag:req.params.tag}); //x => x.
    if (item){
      res.send(item);
    }
    else {
      res.status (404).send ({message: 'Cannot find the product'});
    }
  
  });

export default productRoute;
