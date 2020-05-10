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





