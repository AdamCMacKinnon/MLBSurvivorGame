const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/gamepage', (req,res) => {
  res.render('gamepage');
});


module.exports = router;