const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/api/events');

router.get('/', eventsCtrl.get);



module.exports = router;