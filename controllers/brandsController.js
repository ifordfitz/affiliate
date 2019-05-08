const express = require('express');
const router = express.Router();
const Brand = require('../models/brands.js');

router.get('/new' , (req, res) => {
  res.render('new.ejs');
});

router.get('/:id', (req, res)=>{
    Brand.findById(req.params.id, (err, foundBrand)=>{
      res.render('show.ejs', { brands: foundBrand })    });
});

router.post('/', (req, res) => {
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
  console.log(req.body);
  Brand.create(req.body, (error, createBrand) => {
    res.redirect('/brands/')
  });
});

router.get('/', (req, res) => {
  Brand.find({}, (error, allBrands) => {
    res.render('index.ejs', {
      brands: allBrands
    });
  });
});


router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  Brand.findByIdAndRemove(req.params.id, (err, data) => {
    console.log(err);
    console.log(data);
    res.redirect('/brands')
  })
})

router.get('/:id/edit', (req, res)=>{
    Brand.findById(req.params.id, (err, foundBrand)=>{
        res.render(
    		'edit.ejs',
    		{
    			brands: foundBrand
    		}
    	);
    });
});

router.put('/:id', (req, res)=>{
  console.log(req.body);
  Brand.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/brands');
  });
});






module.exports = router;
