const multer = require('multer');
const path = require('path');

const img = path.join('public', 'img', 'logos');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, img);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const limits = {
  fileSize: 2.0972 * 1_000_000, // 2MB
};

const fileFilter = (req, file, callback) => {
  if (file.mimetype != 'image/png' && file.mimetype != 'image/cde') {
    callback(new Error('Formato inválido'));
  }

  callback(null, true);
};

const multerLogo = multer({ storage, limits, fileFilter });

const uploadLogo = (req, res, next) => {
  multerLogo.single('imagem')(req, res, function (err) {
    if (err) {
      return res.render('minha-conta/logo', { error: err.message, menu: 'logo', title: 'Minha Conta: Logo' });
    }

    next();
  });
};

module.exports = uploadLogo;
