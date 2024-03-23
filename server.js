const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const blogRouter = require('./routes/blogs')
const Blog =require('./models/blog')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blogDatabase')


app.set("views","./views")
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,'public')))

app.get('/',async(req,res)=>{
    const blogs = await Blog.find().sort({createdAt:'desc'})
    res.render('blogs/index',{blogs:blogs})
})


app.use('/blogs',blogRouter)

app.listen(8080)