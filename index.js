//  HEB Horarios fue desarrollado como proyecto final de la materia Proeycto de Desarrollo
//  para dispositivos móviles en el semestre Febrero Junio 2020.
//  Desarrolladores:
    //  Carlos Andrés Miranda Eguia A00817390 carlosa_miranda@outlook.com
    //  Gabriel Ortega Jacobo A01176807 a01176807@itesm.mx
    //  Paulina Cámara Vidales A01039839 a01039839@itesm.mx
const express = require('express')
const app = express()
const PORT = process.env.PORT | 8000
const login = require('./routes/login')
const calendar = require('./routes/calendar')
const serviceAccount = require("./ServiceAccountKey");
const admin = require('firebase-admin')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const firestore = admin.firestore()

app.use(express.json())

app.use('/api/login', (req, _, next)=>{
    req.firestore = firestore
    next()
}, login)

app.use('/api/calendar',(req, _, next)=>{
    req.firestore = firestore
    next()
}, calendar)


app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))





