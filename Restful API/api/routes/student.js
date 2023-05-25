const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        });
})

// for get 1 data from database
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                studentData: result
            });
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({
                error: err
            })

        });
})
// post request

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone

    })

    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newStudent: result
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
// delete request
router.delete('/:id', (req, res, next) => {
    Student.deleteOne({_id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Details deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

//put request



router.put('/:id', (req, res, next) => {
    const studentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }

    Student.findByIdAndUpdate(studentId, {
        $set: {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone
        }
    })
        .then(result => {
            res.status(200).json({
                updated_student: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
        });
    });
});




module.exports = router;