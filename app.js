const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); //解析参数
const app = express();
const router = express.Router();
const option = { //连接数据库的基本配置
    host: 'localhost',
    user: 'root',
    password: 'guopeisi',
    port: '3306',
    database: 'test'
}
app.use(cors()); //解决跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求
app.listen(80, () => { console.log('服务启动') });

const connect = mysql.createConnection(option);
//开始连接数据库
connect.connect(function(err) {
    if (err) {
        console.log(`mysql连接失败: ${err}!`);
    } else {
        console.log("mysql连接成功!");
    }
});

app.all('/login', (req, res) => {
    // connect.connect();
    connect.query('SELECT * FROM student', (e, r) => res.json(new Result({ data: r }))); //connect.query是执行一条sql语句，在回调函数里返回结果
    // connect.end();
})

function Result({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}