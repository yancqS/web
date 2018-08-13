const express = require('express');//引入express框架
const expressStatic = require('express-static');//读取静态文件
const mysql = require('mysql');//操作mysql数据库

let server = express();
server.listen(8888);
const db = mysql.createPool({host: 'localhost', user: 'root', password: 'YANchongqing.910', database: 'todolist'});
server.use("/td", (req, res) => {
    switch (req.query.act) {
        case "getinfo":
            db.query(`SELECT * FROM listtable`, (err, data) => {
                if (err) {
                    res.status(500).send('database error').end();
                } else {
                    res.send(data);
                }
            });
            break;
        case "add":
            db.query(`INSERT INTO listtable (event,data) VALUE ('${req.query.event}','${req.query.data}')`, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('databases errors').end();
                } else {
                    db.query(`SELECT * FROM listtable`, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('database error').end();
                        } else {
                            res.send(data);
                        }
                    })
                }
            });
            break;
        case "del":
            db.query(`DELETE FROM listtable WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("databse error").end();
                } else {
                    db.query(`SELECT * FROM listtable`, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('database error').end();
                        } else {
                            res.send(data);
                        }
                    })
                }
            });
            break;
    }
});

console.log('success run at localhost:8888');
server.use(expressStatic('/'));