const router = require('express').Router()

// function getDate(){
//     let date = new Date(); 

//     let day = date.getDate()
//     day = (day < 10 ? "0" : "") + day

//     let month = date.getMonth()
//     month = (month < 10 ? "0" : "") + month

//     let year = date.getFullYear()

//     return {day, month, year}
// }

const DAYS = ['friday', 'monday', 'saturday', 'sunday', 'thursday', 'tuesday', 'wednesday']
router.get('/:user', async (req, res)=>{
    const fecha = "4-5-2020"
    const user = req.params.user
    const firestore = req.firestore
    const monolito = {} 
    let snapshot = await firestore.collection('user').doc(user).get()
    if (!snapshot.exists){
        return res.status(404).send("no hay usuario con ese id")
    }
    monolito.user = snapshot.data()
    snapshot = await firestore.collection('user').doc(user).collection('week').doc(fecha).get()
    if (!snapshot.exists){
        return res.status(404).send("no hay calendario para esa fecha")
    }
    monolito.resume = snapshot.data()
    const promises = [] 
    for (const day of DAYS){
        promises.push(firestore.collection('user').doc(user).collection('week').doc(fecha).collection('days').doc(day).get())
    }
    const snapshots = await Promise.all(promises)
    monolito[fecha] = {}
    for (const index in DAYS){
        monolito[fecha][DAYS[index]] = snapshots[index].data()
    }
    res.status(501).send({
        message: "OK!", 
        data: {...monolito}
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