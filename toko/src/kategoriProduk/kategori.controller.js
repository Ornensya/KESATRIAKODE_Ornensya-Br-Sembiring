const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const queryParams = req.query;
    return res
    .status(200)
    .json ({
        data: getKategori(queryParams),
        statusCode: 200
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({
        data : getKategoriByID(id),
        statusCode: 200
    })
});

router.post('/', (req,res) => {
    const input = req.body;
    return res
    .status(201)
    .json({
        message : "Success Create Data",
        data: postKategori(input),
        statusCode: 201
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    return res.status(200).json({
        message :"Success Update Data",
        data:updateKategori(id, input),
        statusCode: 200
    });

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({
        data : deleteKategori(id),
        statusCode: 200
    });
});

module.exports = router;