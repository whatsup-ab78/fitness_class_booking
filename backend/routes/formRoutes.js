const express = require('express');
const router = express.Router();
const { savedata, viewdata, viewdatabyid, editdata, deletedata } = require('../controller/formController');

router.post('/submit', savedata);
router.get('/list-forms', viewdata);
router.get('/form-details/:id', viewdatabyid);
router.put('/update-form/:id', editdata);
router.delete('/remove-form/:id', deletedata);

module.exports = router;
