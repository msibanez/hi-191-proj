const express = require('express');
const path = require('path');
const router = express.Router();

let initialPath = path.join(__dirname);

router.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/index.html"))
})

router.get('/add-patient', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/demographics.html"))
})

router.get('/view-patient', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/view-patient.html"))
})

router.get('/search', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/search.html"))
})

router.get('/count', (req, res) => {
    res.sendFile(path.join(initialPath, "../view/count.html"))
})

module.exports = router