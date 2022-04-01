const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/rules', (req,res) => {
  res.render('rules');
});


module.exports = router;