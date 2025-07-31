const express= require('express')

const router=express.Router()
router.get('/',(req,res)=>
{
    res.send('User new form')
})
router.get('/new',(req,res)=>
{
    res.send('User new form')
})

router.get('/:id',(req,res)=>
{
    res.send(`welcome userid: ${req.params.id}`)
})

router.put('/:id',(req,res)=>
{
    res.send(`updqte userid: ${req.params.id}`)
})

router.delete('/:id',(req,res)=>
{
    res.send(`delete userid: ${req.params.id}`)
})

const users=[{name : "sally"},{name : "kyle"}]

router.param("id",(req,res,next,id)=>
{   req.user=users[id]
    console.log(req.user)
    next()

})


module.exports=router
