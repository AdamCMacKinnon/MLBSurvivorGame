const express = require('express');
const router = express.Router();
router.use(express.json());


router.get('/schedules', (req,res) => {
    res.render('schedules');
})

module.exports = router;