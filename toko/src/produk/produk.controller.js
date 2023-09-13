const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const queryParams = req.query;
    return res
    .status(200)
    .json ({
        data: getProduk(queryParams),
        statusCode: 200
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({
        data : getProdukByID(id),
        statusCode: 200
    })
});

router.post('/', (req,res) => {
    const input = req.body;
    return res
    .status(201)
    .json({
        message : "Success Create Data",
        data: postProduk(input),
        statusCode: 201
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    return res.status(200).json({
        message :"Success Update Data",
        data:updateProduk(id, input),
        statusCode: 200
    });

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({
        data : deleteProduk(id),
        statusCode: 200
    });
});

module.exports = router;