const express= require('express');
const app = express();
const path = require('path');
const registration = require('./models/registration')
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))
app.set('public',path.join(__dirname,'public'))

app.use(express.static("public"))

app.use(express.urlencoded({extended:true}));


app.get('/',(req, res) => {
    res.sendFile('index.html')
})

app.get('/registration',(req, res) => {
    res.render('new.ejs')
})

app.post('/registration', async (req, res) => {
    //check email and if duplicate email is found then tell to reregister
    const c= new registration(req.body);
    await c.save();
    res.redirect('/')
        
})


app.listen(4000,() =>{
    console.log('server is up at 4000');
})