var express = require('express');
const conn = require('../public/javascripts/conn_sql');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* 查询数据库数据操作 */
router.get('/List', function (req, res) {
    const sql = "SELECT * FROM book";
    conn.query(sql, function (err, result) {
        if (err) {
            console.log("查询语句执行异常");
        }
        res.send(result);
    })
})

/* 插入表数据操作 */
router.get('/Insert', function (req, res) {
    const {ID, Name, Author, Publisher, Price, ISBN} = req.query;
    const sql = "INSERT INTO book (ID, Name, Author, Publisher, Price, ISBN) VALUES (?, ?, ?, ?, ?, ?)";
    const sqlParams = [ID, Name, Author, Publisher, Price, ISBN];

    conn.query(sql, sqlParams, function (err) {
        if (err) {
            console.log("添加语句执行异常:", err);
            return res.send({error: 1, message: '插入失败', errorDetails: err});
        } else {
            res.send({error: 0, message: 'success'});
        }
    });
});

/* 删除表数据操作 */
router.get('/Delete', function (req, res) {
    const {ID} = req.query;
    const sql = "DELETE FROM book WHERE ID = ?";
    const sqlParams = [ID];

    conn.query(sql, sqlParams, function (err, result) {
        if (err) {
            console.log("查询语句执行异常:", err);
            return res.send({error: 1, message: '删除失败', errorDetails: err});
        } else {
            res.send({error: 0, message: 'success'});
        }
    });
});


module.exports = router;
