const express = require('express')
const Blog = require('./../models/blog')
const router = express.Router()

router.get('/new',(req,res)=>{
    res.render('blogs/new',{blog:new Blog()})
})

router.get('/edit/:id',async(req,res)=>{
    const blog =  await Blog.findById(req.params.id)
    res.render('blogs/edit',{blog:blog})
})

router.get('/:slug',async(req,res)=>{
    const blog = await Blog.findOne({slug: req.params.slug})
    if(blog == null) res.redirect('/')
    res.render('blogs/show', {blog : blog })  
})

router.post('/',async(req,res,next) =>{
    req.blog = new Blog()
    next()
},saveBlog('new'))


router.put('/:id',async(req,res,next) =>{
    req.blog = await Blog.findById(req.params.id)
    next()
},saveBlog('edit'))

router.delete('/:id',async(req,res)=>{
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveBlog(path){
    return async(req,res)=>{
        let blog = req.blog
            blog.title=req.body.title
            blog.description=req.body.description
            blog.markdown=req.body.markdown
        
        try{
            blog = await blog.save()
            res.redirect(`/blogs/${blog.slug}`)
        }catch(e){
            res.render(`blogs/${path}`,{blog:blog})
        }
    }
}

module.exports = router