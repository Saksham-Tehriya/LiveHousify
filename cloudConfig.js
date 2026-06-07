const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
//note see in env file hm kuch bhi name de skte hain variable ko
//but inside config thing hme by default yhi name dene hain coz ye bydefault names hain.

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'livehousify_DEV',
    allowerdFormats:['png', 'jpg', 'jpeg']
   
  },
}); // so basically we've defined our storage like this.

module.exports = {
    cloudinary,
    storage
}