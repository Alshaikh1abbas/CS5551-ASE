var express=require('express');
var app=express();
app.get('/',function(req,res){res.send("hello world");});
app.post('/', function (req, res) {
    res.send("you just called the post method at'hello'!\n")
})

app.listen(3000)
