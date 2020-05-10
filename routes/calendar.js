const router = require('express').Router()

router.get('/:user', (req, res)=>{
    // TODO
    res.status(501).send({
        message: "TODO: GET CURRENT CALENDAR", 
        data: {
            user: req.params.user
        }
    })
})

router.get('/:user/past', (req, res)=>{ // this calendar is relative to the "current calendar"
    // TODO
    res.status(501).send({
        message: "TODO: GET PAST WEEK CALENDAR",
        data: {
            user: req.params.user
        }
    })
})

router.get('/:user/future', (req, res)=>{ // this calendar is relative to the "current calendar" 
    // TODO
    res.status(501).send({
        message: "TODO: GET NEXT CALENDAR",
        data: {
            user: req.params.user
        }
    })
})

router.get('/:user/:day', (req, res)=>{
    // TODO
    res.status(501).send({
        message: "TODO: GET DAY RESUME", 
        data: {
            user: req.params.user,
            day: req.params.day
        }
    })
})

router.get("/:user/:day/:field", (req, res)=>{
    // TODO
    res.status(501).send({
        message: "TODO: GET A FIELD FOR A PARTICULAR DAY", 
        data: {
            user: req.params.user,
            day: req.params.day, 
            field: req.params.field
        }
    })
})

module.exports = router