var express = require('express')
var nunjucks = require('nunjucks')

var app = express()
app.set('view engine', nunjucks)

nunjucks.configure(__dirname + '/templates', {
    autoescape: true,
    express: app
});

app.engine('html', nunjucks.render);
app.use('/bower_components', express.static(__dirname + '/bower_components'))
app.use('/static', express.static(__dirname + '/static'))


app.get('/', (req, res) => {
    res.render('index.html', {})
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})
