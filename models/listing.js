const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,

        // type: String,
        // default:"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v)=> v === ""?"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v, 
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",  //Model name :) 
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", //Model namee again bro :) 
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    //iesme(listing) ous listing ka data will come jo delete hone wali haii

    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });


    }

})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;