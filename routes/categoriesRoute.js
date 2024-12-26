const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/doctorCategories');

router.post('/addcatogory', addCategory);
router.get('/getcatogories', getCategories);

module.exports = router;
