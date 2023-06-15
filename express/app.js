var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


var books = [
    {
        ID: 1,
        Name: "水浒传",
        Author: "施耐庵",
        Pub: "人民文学出版社",
        Price: "36",
        ISBN: "9787020015016"
    },
    {
        ID: 2,
        Name: "三国演义",
        Author: "罗贯中",
        Pub: "人民文学出版社",
        Price: "46",
        ISBN: "9787514602227"
    },
    {
        ID: 3,
        Name: "红楼梦",
        Author: "曹雪芹",
        Pub: "人民文学出版社",
        Price: "50",
        ISBN: "9787802506077"
    },
    {
        ID: 4,
        Name: "西游记",
        Author: "吴承恩",
        Pub: "人民文学出版社",
        Price: "59",
        ISBN: "9787020002207"
    },
    {
        ID: 5,
        Name: "飘",
        Author: "玛格丽特·米切尔",
        Pub: "中央编译出版社",
        Price: "72",
        ISBN: "9787550009455"
    },
    {
        ID: 6,
        Name: "巴黎圣母院",
        Author: "维克多·雨果",
        Pub: "晨光出版社",
        Price: "30",
        ISBN: "9787541495069"
    },
    {
        ID: 7,
        Name: "童年",
        Author: "高尔基",
        Pub: "中国画报出版社",
        Price: "30",
        ISBN: "9787514611533"
    }
]

app.get('/BookList', (req, res) => {
    res.json({
        code: 200,
        data: books
    })
})

app.get('/LogIn', (req, res) => {
    const {userName, passWord} = req.query;

    if (userName === 'admin' && passWord === 'admin') {
        res.json({
            code: 200,
            status: 1,
            userName: userName,
            passWord: passWord
        });
    } else {
        res.json({
            code: 401,
            status: 2,
            userName: userName,
            passWord: passWord
        });
    }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
