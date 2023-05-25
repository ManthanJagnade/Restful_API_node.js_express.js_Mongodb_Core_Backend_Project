const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'faculty get Request'
    })
})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'faculty post Request'
    })
})



module.exports = router;