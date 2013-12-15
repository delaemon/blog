/*
 *
 */

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog')
// todo error handling
var entrySchemaJson = require('/home/dela/www/blog/schema/entry')
var entrySchema = mongoose.Schema(entrySchemaJson)
var entryModel = mongoose.model('entry', entrySchema)

exports.index = function(req, res){
    var page = req.params.page || 0
        console.log(page)
    var doc = entryModel.find({'publish': 1})
         .skip(page)
         .limit(1)
         .sort({date: -1})
         .exec(function(err, data) {
            if (data.length == 0) {
              res.render('error', {
                title: "Delaemon's Blog",
                subtitle: "A weblog about Programming",
              })
              return;
            }
            var d = new Date(data[0].date)
            data[0].day = d.getDate()
            data[0].month = d.getMonth() + 1
            data[0].year = d.getFullYear()
            res.render('index', {
                title: "Delaemon's Blog",
                subtitle: "A weblog about Programming",
                entry: data[0],
                page: Number(page) + 1
            })
        })
}
