const { Router } = require('express');
var express = require('express');
const productHelpers = require('../helpers/producthelpers');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {


  productHelpers.getAllProducts().then((products)=>{
  res.render('admin/view-products', {  products }) 
  })
  
});


router.get('/add-product', function (req, res) {
  res.render("admin/add-product")
})

router.post("/add-product", (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("admin/add-product");
      }
    });
  });
});
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image = req.files.Image;
      image.mv("./public/product-images/" + id + ".jpg")
        }
    })
  
})
module.exports = router;
