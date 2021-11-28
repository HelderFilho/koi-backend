const CreateProduct = require('../api/product/createProduct');
const GetAllProducts = require('../api/product/getAllProducts')
const DeleteProduct = require('../api/product/deleteProduct')
const UpdateProduct = require('../api/product/updateProduct')
module.exports = (app) => {
   app.post('/api/product/createProduct', CreateProduct.post);
   app.get('/api/product/getAllProducts', GetAllProducts.get);
   app.post('/api/product/deleteProduct', DeleteProduct.post)
   app.post('/api/product/updateProduct', UpdateProduct.post)
}