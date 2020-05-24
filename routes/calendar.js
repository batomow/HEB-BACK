const router = require('express').Router()

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
router.post('/all', async (req, res)=>{
    const {user, fecha } = req.body
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
    snapshot = await firestore.collection('user').doc(user).collection('week').doc(fecha).get()
    if (!snapshot.exists){
        return res.send({
            error: true,
            message: "no hay calendario para esa fecha",
            data: ""
        })
    }
    monolito.resume = snapshot.data()
    const promises = [] 
    for (const day of DAYS){
        promises.push(firestore.collection('user').doc(user).collection('week').doc(fecha).collection('days').doc(day).get())
    }
    const snapshots = await Promise.all(promises)
    monolito.current = []
    for (const index in DAYS){
        monolito.current.push(snapshots[index].data())
    }
    res.send({
        error: false,
        message: "Bienvenido!", 
        data: {...monolito}
    })
})

module.exports = router