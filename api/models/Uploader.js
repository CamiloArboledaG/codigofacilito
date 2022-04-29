const cloudinary = require("cloudinary");

const secrects = require("../config/secrets");

cloudinary.config(secrects.cloudinary);

module.exports = function (file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      console.log(result);
      if (result.secure_url) {
        resolve(result.secure_url);
      } else {
        reject(result.error);
      }
    });
  });
};
