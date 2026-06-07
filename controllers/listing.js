const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
    // console.log(req.user);
    res.render("./listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");//here now listing ko populate krne ke sath sath author ko bhi we'll
    //populate for each review. for this we would have to use nested populate.  .. like hr ek single review ke liye we would like to populate its 
    //author as well..

    //here ieska matlab listing mai sare reviews aa hei jayen but also hr ek  review ke sath we are doing nested populate ke hamare pass hr ek 
    //review ke liye uska populate bhi aajaye 


    //means we want hr ek owner ki information also 
    //means jb bhi our listing db se aarahi hogi toh usme hr ek reviews toh aayenge but along with that owner ki bhi sari ki sari information 
    //aayegi
    if (!listing) {
        req.flash("error", "Listing your requested for does not exist!");
        return res.redirect("/listings");

    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing });

};



module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
        .send()
    console.log(response.body.features[0].geometry);
    


    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }


    // if(!newListing.title){
    //     throw new ExpressError(400,"Title is missing");
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400,"Description is missing");
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400,"location is missing");
    // }

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//just for my knowledge: req.body ko iedher bhejna ka matlab haii jo hmne listing.schema create kia haii inside joi
//uske inside we're checkign jo bhi schema ke inside condition hmne define kiye hain kya req.body satisfying all those
//considtions kya req.body oun conditions ke basis pe validate ho pa rhi haii.


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing your requested for does not exist!");
        return res.redirect("/listings");

    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};