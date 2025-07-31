const express=require('express')

const app = express()

app.set('view engine',"ejs")

app.get('/',logger,(req,res) => {
res.render('index',{text : "world"})
})

const userouter=require('./routes/users')

// app.use(logger)
app.use('/user',userouter)

app.listen(3000)

function logger(req,res,next) 
{
console.log(req.originalUrl)
next()
}

