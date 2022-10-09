// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'diyl5miyp', 
  api_key: '955192234838715', 
  api_secret: 'TzMBEmEm2YbXX6eun77lmYOKlGM' ,
  secure:true
});

module.exports = cloudinary;
