const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
   
    res.status(200).json({'success':true, msg: 'Show all bootcamps'});
})

router.post('/', (req, res)=>{
   
    res.status(200).json({'success':true, msg: 'Bootcamp created'});
})

router.put('/:id', (req, res)=>{
   
    res.status(200).json({'success':true, msg: `Bootcamp created ${req.params.id}`});
})
router.delete('/:id', (req, res)=>{
   
    res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
})

module.exports = router;