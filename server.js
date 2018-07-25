// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/public/dist/public' ));

app.use(express.static( __dirname + '/static/'));
// Setting our Views Folder Directory
//DATABASE/MONGOOSE
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://18.191.188.91/intro');

// Use native promises
mongoose.Promise = global.Promise;

var ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: [3, "did not submit. product name too short"]
        //function(){
        //     return (this.name.length > 2);
        // }, //function(){//test for uniqueness}
        },
    num : {
        type:Number,
        required:true,
        min: [0,"did not submit. invalid quantity"]
        },
    price : {
        type:Number,
        required:true,
        min: [0,"did not submit. invalid price"]
        },
},{timestamps:true});
autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, 'Product');
mongoose.model('Product',ProductSchema);

var Product = mongoose.model('Product');

app.get("/server/products",(req,res) =>{
    //data for all products
    Product.find({},function(err,prods){
        if(err){
            console.log("error in find all:",err);
            res.json({message: "ERROR",error : err});
        }
        else{
            res.json({message: "FindAll",data:prods});
        }
    });
});

app.get("/server/product/:id",(req,res) =>{
    //data for show product
    console.log("finding product with ID:",req.params.id);
    Product.findOne({_id:req.params.id},function(err,prod){
        if(err){
            console.log("error in find prod and show DB side:",err);
            res.json({message: "ERROR",error : err});
        }
        else if(prod == null){
            console.log("could not find prod with ID:",req.params.id);
            res.json({message: "ERROR",error : req.params.id});
        }
        else{
            console.log("found product:",prod);
            res.json({message: "Success",data : prod});
        }
    });
});

app.post("/server/product/new",(req,res) =>{
    //new product
    var prod = new Product({name : req.body.name,num : req.body.num,price : req.body.price});
    console.log("new product:",prod);
    prod.save(function(saveError){
        if(saveError){
            console.log("could not save final prod while editing:",saveError);
            res.json({message:"saveError",error: saveError})
        }
        else{
            console.log("new product: ",prod);
            res.json({message :"Create",data:prod});
        }
    });
});

app.put("/server/product/:id/edit",(req,res) =>{
    //edit product
    var newprod = new Product({name : req.body.name,num : req.body.num,price: req.body.price});
    console.log("new data for product: ",newprod);
    console.log("finding and editing product with ID:",req.params.id);
    Product.findOne({_id:req.params.id},function(err,prod){
        if(err){
            console.log("error in find prod and show DB side:",err);
            res.json({message: "ERROR",error : err});
        }
        else if(prod == null){
            console.log("could not find product with ID:",req.params.id);
            res.json({message: "ERROR",error : req.params.id});
        }
        else{
            console.log("found product:",prod);
            prod.name = newprod.name;
            prod.num = newprod.num;
            prod.price = newprod.price;
            prod.save(function(saveError){
                if(saveError){
                    console.log("could not save final prod while editing:",saveError);
                    res.json({message:"saveError",error: saveError})
                }
                else{
                    console.log("edited product: ",prod);
                    res.json({message :"Edit",data:prod});
                }
            });
        }
    });
});

app.delete("/server/product/:id/delete",(req,res) =>{
    //delete product
    console.log("finding and deleting product with ID:",req.params.id);
    Product.findOneAndRemove({_id:req.params.id},function(err,prod){
        if(err){
            console.log("error in find prod and show DB side:",err);
            res.json({message: "ERROR",error : err});
        }
        else if(prod == null){
            console.log("could not find product with ID:",req.params.id);
            res.json({message: "ERROR",error : req.params.id});
        }
        else{
            console.log("deleting product:",prod);
            res.json({message :"Delete",data:prod});
        }
    });
});

// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})




