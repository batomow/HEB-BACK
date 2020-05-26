const router = require('express').Router()
const moment = require('moment')

function inferFechas(fecha){
    const dates = [] 
    const date =  moment(fecha, 'D-M-YYYY')
    for (let n = 0; n<5; n++){
        dates.push(date.format("D-M-YYYY"))
        date.subtract(7, "days")
    }
    return dates
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
router.post('/all', async (req, res)=>{
    const {user, fecha } = req.body

    //inferir las otras fechas
    const fechas = inferFechas(fecha)

    const firestore = req.firestore
    const monolito = {} 
    let snapshot = await firestore.collection('user').doc(user).get()
    if (!snapshot.exists){
        return res.send({
            error: true, 
            message: "no hay usuario con ese id", 
            data: ""
        })
    }
    monolito.user = snapshot.data()

    const validationPromises = [] 
    for (f of fechas){
        validationPromises.push(firestore.collection('user').doc(user).collection('week').doc(f).get())
    }
    const validationSnapshots = await Promise.all(validationPromises)
    
    for (let n = 0; n<5; n++){
        if (!validationSnapshots[n].exists){
            return res.send({
                error: true,
                message: "no hay calendario para esa fecha",
                data: f 
            })
        }
        monolito[`resume${n}`] = (validationSnapshots[n].data())
    }

    const promises = [] 
    for (f of fechas){
        for (const day of DAYS){
            promises.push(firestore.collection('user').doc(user).collection('week').doc(f).collection('days').doc(day).get())
        }
    }
    const snapshots = await Promise.all(promises)

    for (let n = 0; n<5; n++){
        monolito[`week${n}`] = []
        for (let m = 0; m<7; m++){
            monolito[`week${n}`].push(snapshots[n+m].data())
        }
    }

    res.send({
        error: false,
        message: "Bienvenido!", 
        data: {...monolito}
    })
})

module.exports = router