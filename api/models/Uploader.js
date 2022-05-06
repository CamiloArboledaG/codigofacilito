const cloudinary = require("cloudinary");

const secrets = require("../config/secrets");

/* Configuring the cloudinary API with the API key and secret. */
cloudinary.config(secrets.cloudinary);

/* Exporting a function that returns a promise. */
module.exports = function (file) {
  return new Promise((resolve, reject) => {
    /* Uploading the file to the cloudinary server. */
    cloudinary.uploader.upload(file, function (result) {
      console.log(result);
      if (result.secure_url) return resolve(result.secure_url);
      reject(new Error("Could not upload the file."));
    });
  });
};
