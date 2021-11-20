const multer = require('multer');
const path = require('path');
const { Categoria } = require('../database/models');

const img = path.join('public', 'img', 'produtos');

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

const multerProduto = multer({ storage, limits, fileFilter });

const uploadProduto = (req, res, next) => {
  multerProduto.single('nomeImagem')(req, res, async function (err) {
    if (err) {
      const categorias = await Categoria.findAll();
      return res.render('minha-conta-admin/editarproduto', { error: err.message, categorias, menu: 'produtos', title: 'Minha Conta: Produtos' });
    }

    next();
  });
};

module.exports = uploadProduto;
