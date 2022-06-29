const express = require("express");
const router = express.Router();
router.use(express.json());


router.get('/admin', (req,res) => {
    res.render('admin')
})


module.exports = router;