const router = require('express').Router()

router.post('/', async (req, res)=>{
    const firestore = req.firestore
    const snapshot = await firestore.collection('user').doc(req.body.user).get()
    if (!snapshot){
        return res.status(401).send(`There is no user with ${req.body.user} id`)
    }
    if (req.body.password != snapshot.data().password){
        return res.status(401).send("Wrong password")
    }
    res.status(200).send("Bienvenido")
})

module.exports = router