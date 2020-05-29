//  HEB Horarios fue desarrollado como proyecto final de la materia Proeycto de Desarrollo
//  para dispositivos móviles en el semestre Febrero Junio 2020.
//  Desarrolladores:
    //  Carlos Andrés Miranda Eguia A00817390 carlosa_miranda@outlook.com
    //  Gabriel Ortega Jacobo A01176807 a01176807@itesm.mx
    //  Paulina Cámara Vidales A01039839 a01039839@itesm.mx
const router = require('express').Router()

router.post('/', async (req, res)=>{
    const {fecha, user, password} = req.body
    if (!fecha || !user || !password){
        return res.send({
            error: true, 
            message: "Faltan llenar datos", 
            data: ""
        })
    }
    const firestore = req.firestore
    const snapshot = await firestore.collection('user').doc(req.body.user).get()
    if (!snapshot.exists){
        return res.send({
            error: true, 
            message: 'No hay usuario con ese id', 
            data: ""
        })
    }
    if (req.body.password != snapshot.data().password){
        return res.send({
            error: true, 
            message: "contraseña incorrecta", 
            data: ""
        })
    }
    res.send({
        error: false, 
        message: "Bienvenido",
        data: ""
    })
})

module.exports = router