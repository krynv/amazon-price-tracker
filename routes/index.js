import express from 'express';
import api from '../api';

const router = express.Router();

router.get('/details/', (req, res) => {

    // http://localhost:1337/details/?url=https://www.amazon.co.uk/Samsung-MZ-V7E1T0BW-V-NAND-Express-Solid/dp/B07CGJNLBB

    api.getAmazonItem(req.query.url).then(response => {
        res.json(response);
    });
});

export default router;