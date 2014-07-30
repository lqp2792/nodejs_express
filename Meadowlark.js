var fortune = require('./lib/fortune.js');
var express = require('express'),
    handlebars = require('express3-handlebars'),
    app = express(),
    hbs;
hbs = handlebars.create(
    {
        extname:'.hbs',
        defaultLayout: 'main.hbs'
    }
);
hbs.loadPartials(function(err, partials) {
    console.log(partials);
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);

function getWeatherData(){
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C'
            }
        ]
    };
}


//turn on/off test
app.use(function(request, response, next) {
    if(!response.locals.partials) response.locals.partials = {};
    response.locals.partials.weather = getWeatherData();
    response.locals.showTests = app.get('env') !== 'production' && request.query.test == '1';
    next();
});

// routes
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('home');
});

app.get('/headers', function(request, response) {
    response.set('Content-type', 'text/plain');
    var s = '';
    for(var name in request.headers) s+= name + ':' + request.headers[name] + '\n';
    response.send(s);
});

app.get('/about', function(request, response) {
    response.render('about', {
        fortune : fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });

});

app.get('/tours/hood-river', function(request, response) {
    response.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(request, response) {
    response.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(request, response) {
    response.render('tours/request-group-rate');
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

