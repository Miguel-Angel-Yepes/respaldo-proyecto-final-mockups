const express = require('express');
const router = express.Router();
const preferenceController = require('../controllers/preference');

router.post('/create_preference', preferenceController.createPreference);

module.exports = router;