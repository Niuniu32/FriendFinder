var path = require('path')
var fs = require('fs')

module.exports = function(app) {
    app.get('/Survey', function(req,res) {
        res.sendFile(path.join(__dirname,'../public/survey.html'))
    })
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname,'../public/home.html'))
    })
}