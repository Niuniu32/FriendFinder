var path = require('path')
var fs = require('fs')

module.exports = function(app){
    app.get('/api/friends',function(req,res) {
        var friend = {}
        fs.readFile('./app/data/friend.js','utf8',function(error,data) {
            if (error) throw error
            friend = JSON.parse(data)
            res.json(friend)
        })
    })
    app.post('/api/friend', function(req,res) {
        var friend1= []
        var matchedFriends = {}

        var newfriend = {
            friendName: req.body.friendName,
            photoLink: req.body.photoLink,
            results: []
        }
        req.body.results.forEach(function(element) {
            friend1.results.push(parseInt(element))
        });

        
        fs.readFile('./app/data/friend.js','utf8',function(error,data) {
            if (error) throw error
            newfriend = JSON.parse(data)
            matchedFriends = findFriend(newfriend,matchedFriends)
            friend1.push(friend)

            fs.writeFile('./app/data/friends.js', JSON.stringify(friends), function(err){
                console.log('Saved');
            });

            res.json(matchedFriend)
        })        
    })

    function findFriend(friend, friends) {
        var matchResults = []
        var match = {value: 50, index: 0} 
        friends.forEach(function(element) {
            var differenceResults = []
            var candidateResults = element.results
            var friendResults = friend.results
            candidateResults.forEach(function(element, index) {
                differenceResults.push(Math.abs(element-friendResults[index]))
            })

            matchResults.push(differenceResults.reduce(function(total,num) {
                return total+=num
            }, 0))
        });
        matchResults.forEach(function(element,index){
            if (element<match.value) {
                match.value = element
                match.index = index
            }
        })
        return friends[match.index]
    }
}