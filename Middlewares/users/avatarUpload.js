const uploader = require("../../Utilities/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "only .jpg, jpeg or .png formate allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        error: {
          avatar: {
            msg: err.massage,
          },
        },
      });
    } else {
      next();
    }
  });
};
module.exports = avatarUpload;
