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


var news = [
    {
        id: 1,
        title: '女学霸边读研边兼职3年赚17万',
        desc: '真的好厉害，一年赚6万',
        createTime: '2023-06-15'
    },
    {
        id: 2,
        title: '杭州亚运会筹备工作进入冲刺阶段',
        desc: '加油！！！',
        createTime: '2023-06-14'
    },
    {
        id: 3,
        title: '司机吃零食接电话酿事故致5死',
        desc: '永远对司机说NO！',
        createTime: '2023-06-13'
    },
    {
        id: 4,
        title: '谢娜再去已是嘉宾',
        desc: '不知道这是说啥',
        createTime: '2023-06-12'
    }
]

// 接口  叫做 /list   返回数据 [1,2,3,4,5]
app.get('/list', (req, res) => {
    res.json({
        code: 200,
        data: news
    })
})

app.post('/LogIn',(req,res)=>{
    const{userName,passWord}=req.body
    if(userName==='admin'&&passWord==='admin'){
        res.json({
            code: 200,
            status: 1
        })
    }else{
        res.json({
            code: 401,
            status: 2
        })
    }
})


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
