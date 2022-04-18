const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', (req,res) => {
  res.render('index');
});

router.get('/thankyou', (req, res) => {
    res.render('thankyou');
})



module.exports = router;