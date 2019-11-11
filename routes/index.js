const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msg: 'Welcome to EnglishKidsTalk API! For the documentation, kindly follow to this link!',
        link: 'https://documenter.getpostman.com/view/3186416/RWgwQvKL'
    });
});

router.stack

/* Inventory Router */
router.post('/gps', controllers.InventoryController.add);
// router.patch('/gps/:id', controllers.InventoryController.update);

module.exports = router;