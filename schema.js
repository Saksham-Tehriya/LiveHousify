const Joi = require('joi');

// now we want ki hm apne listingSchema ko validate kren.

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
        location: Joi.string().required(),

    }).required()
});

//just for my knowledge
// means joi ke inside hamari ek object aani chaiye and ies object ka naam hoga listing now listing name ki object 
//inside kuch kuch or paramenters honge like listing name ki object ke inside kya kya hoga ye jo listing hai ye joi ke 
//according yani hamare schema validation ke according ek object honi chaiye and ye required honi chaiyeee. required
// yani hamare ye listing object hamesha jb bhi koi req aaye hamare pass uske inside ke listing name ki objecte honi hi 
// honi chaiye

//means joi object ke inside actual object haii jiski sari values ko we're checking.. and validating..


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});