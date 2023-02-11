
exports.getLoginForm=(req,res)=>{
    console.log(req.query);
    res.status(200).render('login',
    {
        title:'Log into your account'
    })
}

exports.getSignUpForm=(req,res)=>{

res.status(200).render('signup',{
    title:'Sign up'
})


}


exports.getHome=(req,res)=>{

res.status(200).render('home',{
    title:"home"
})

}


exports.knowStock=(req,res)=>{

res.status(200).render('askStock',{
    title:"Ask about stock"
})


}