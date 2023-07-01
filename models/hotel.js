const mongoose=require('mongoose')

const hotelSchema=mongoose.Schema({
    name: {
		type: String,
		required: true
	},
    price: String,
	address: String,
	description: String,
	image: [ String ]
})

module.exports=mongoose.model('hotel',hotelSchema);