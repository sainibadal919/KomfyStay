const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Hotel = require('../models/hotel');


router.get('/', (req, res) => {
	res.render('landing', { page: 'Home - Hotels' });
});
//=======CRUD using REST API's==============
//index
router.get('/hotels',async(req,res)=>{
       try {
        const hotels= await Hotel.find();
        res.render('hotels/index',{hotels,page:'Index-Hotel'});
        
       } catch (error) {
        req.flash('error','Something went wrong while displaying hotels. Please try again later.')
        console.log(error);
        res.redirect('/');
       }
})

router.get('/hotels/new',(req,res)=>{
    res.render('hotels/new', { page: 'New Hotel - Hotels' });

})

router.post('/hotels',async(req,res)=>{
    try {
        const newHotel=new Hotel(req.body.hotel);
        await newHotel.save();
        res.redirect(`/hotels/${newHotel._id}`);
        
    } catch (error) {
        req.flash('error','Something went wrong while adding hotel. Please try again');
        res.redirect('/hotels');
    }

})
router.get('/hotels/:id',async(req,res)=>{
    try {
         const hotel=await Hotel.findById(req.params.id);
         console.log(hotel);
         res.render('hotels/show',{hotel,page:"Hotel-Show"});
        
    } catch (error) {
        req.flash("error",'Something went wrong while fetching details of hotel. Please try again');
        console.log(error);
        res.redirect('/hotels');
    }
})

router.get('/hotels/:id/edit',async(req,res)=>{
    try {
        const hotel=await Hotel.findById(req.params.id);
        res.render('hotels/edit',{hotel,page:'Hotel-Edit'});

        
    } catch (error) {
        req.flash('error','Something went wrong while updating the hotel');
        console.log(error);
        res.redirect(`/hotels/${req.params.id}`);
    }

})

router.patch('/hotels/:id',async(req,res)=>{
     try {
         await Hotel.findByIdAndUpdate(req.params.id,req.body.hotel);
         res.redirect(`/hotels/${req.params.id}`);
      
     } catch (error) {
        req.flash('error','Something went wrong while updating the hotel');
        console.log(error);
        res.redirect(`/hotels/${req.params.id}`);
     }
})

router.delete('/hotels/:id',async(req,res)=>{

})

module.exports=router;
