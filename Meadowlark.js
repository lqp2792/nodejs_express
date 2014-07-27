var express = require('express');
var app = express();
var handlebars = require('express3-handlebars');
app.engine('hbs', handlebars({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

var fortunes = ["Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not feat what you don'n know",
    "You will have a pleasant surpise",
    "Whenever possible, keep it smile"
];
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('home');
});

app.get('/about', function(request, response) {
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    response.render('about', {fortune : randomFortune});
});
/*Custom 404 page*/
app.use(function(request, response) {
    response.status(404);
    response.render('404');
});

app.use(function(error, request, response, next) {
    console.error(error.stack);
    response.status(500);
    response.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost ' + app.get('port') + '; press Crtl-C to terminate');
});

