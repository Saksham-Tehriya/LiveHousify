const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
     console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDb = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '69f94fe2794e203d5ad0549a'}))  //ye naya array create krta hai and ye new property new array m insert
          //hogi
      //ieska matlab array ke inside jo hr ek individual object haii ous object mai jakr ek new property ko add kr dega.means we're converting our
      //object into a new object jiske inside hamari individual ki sari individual properties toh aayengi but uske sath owner id bhi aayegi.
                                  
    await Listing.insertMany(initData.data); //initData apne aap mai ek object hai and iesme hme key data ko access krna haii.
    console.log("data was initialized");
}

initDb();
