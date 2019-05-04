const express = require('express');
const router = express.Router();
const Brand = require('../models/brands.js');

router.get('/brands/new' , (req, res) => {
  res.render('new.ejs');
});

router.get('/brands/:id', (req, res)=>{
    Brand.findById(req.params.id, (err, foundBrand)=>{
      res.render('show.ejs', { brands: foundBrand })    });
});

router.post('/brands/', (req, res) => {
  if(req.body.ownItem === 'on') {
    req.body.ownItem = true;
  } else {
    req.body.ownItem = false;
  }
  if(req.body.socialMedia === 'on') {
    req.body.socialMedia = true;
  } else {
    req.body.socialMedia = false;
  }
  Brand.create(req.body, (error, createBrand) => {
    res.redirect('/brands/')
  });
});

router.get('/brands/', (req, res) => {
  Brand.find({}, (error, allBrands) => {
    res.render('index.ejs', {
      brands: allBrands
    });
  });
});


router.delete('/brands/:id', (req, res) => {
  Brand.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/brands')
  })
})

router.get('/brands/:id/edit', (req, res)=>{
    Brand.findById(req.params.id, (err, foundBrand)=>{ //find the fruit
        res.render(
    		'edit.ejs',
    		{
    			brands: foundBrand
    		}
    	);
    });
});

router.put('/brands/:id', (req, res)=>{
  console.log(req.body);
  Brand.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/brands');
  });
});






module.exports = router;
