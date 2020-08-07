const port = process.env.PORT || 3000;
console.log(port);
const express = require('express');
const app = express();
const websocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const AES = require("crypto-js/aes");
const core = require("crypto-js/core");
const utf8 = require("crypto-js/enc-utf8");
const sha256 = require("sha256");
const mysql = require('mysql');
var sslRedirect = require('heroku-ssl-redirect');
/*const btoa = require('btoa');
const atob = require('atob');*/
const webpush = require('web-push');
const expressStaticGzip = require('express-static-gzip');

/*const options = {
    key: fs.readFileSync('privateKey.key'),
    cert: fs.readFileSync('certificate.crt')
};*/

const httpServer = http.createServer(app);

app.use(sslRedirect([
    'other',
    'development',
    'production'
]));
app.use(express.urlencoded());
app.use("/", expressStaticGzip(path.join(__dirname, 'achat_enh')));

webpush.setVapidDetails('mailto:amankumar.spj410@gmail.com', 'BKal45QDB9TxxVMa3g_eWVUBDS3UE_jWsDK54MXSlkM0Z0XOMbrqJEqVSvcbvr-Ye2skXYjI8OAr9nn1BoXtd4k', 'ezeE1wppCKADrVKBN-iWvb5N2NaQga_ztPePJCpUO54')

/*
let con = mysql.createConnection({
    host: "localhost",
    port: "3001",
    user: "root",
    password: "admin",
    database: "AChat"
});

let con = mysql.createConnection({
    host: "byhgdomz49eejv3e0lcq-mysql.services.clever-cloud.com",
    port: "3306",
    user: "ui9fsoip1adol6yz",
    password: "bsUPcFRNI6LxeKUfELbe",
    database: "byhgdomz49eejv3e0lcq"
});

// CREATE TABLE users ( id int PRIMARY KEY auto_increment, name letCHAR(255) not null, email letCHAR(255) unique  pass letCHAR(300) not null, username letCHAR(64) unique NOT null, created timestamp)
// create table msg6125167219 ( id int primary key auto_increment, username letchar(64) not null, message TEXT(50000) not null, who bool, seen bool, enc BOOLEAN NULL DEFAULT FALSE, timesent timestamp )
// CREATE TABLE sessions ( id int auto_increment PRIMARY KEY, sessionkey letCHAR(255) , hash2 letCHAR(255), email letCHAR(64) NOT null, created timestamp);
// CREATE TABLE enckeys (id int auto_increment PRIMARY KEY, user1 letCHAR(64) unique, user2 letCHAR(64) unique, key1 letCHAR(1024), key2 letCHAR(1024), time timestamp );


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database! \n --------------------------------------------------------------------");
});
*/
// ###################################### REquired functions ##################################################
//aes encrypt !
function encrypt(cipherkey, msg) {
    let enc = AES.encrypt(msg, cipherkey).toString();
    return enc;
}

function decrypt(cipherkey, e_msg) {
    let decryptedmsg = AES.decrypt(e_msg, cipherkey);
    let dec = decryptedmsg.toString(utf8);
    return dec;
}

async function sq(sql, callback, arr) {
    con.query(sql, arr, function(err, result, fields) {
        if (err) throw err;
        console.log("query done");
        callback(result, err);
    });
}

// Username to Name array.....
let uton = function() {
    let q = `SELECT username, name FROM users;`
    sq(q, function(r) {
        if (r.length > 0) {
            r.forEach(e => {
                utona[e.username] = e.name;
            });
            console.log(utona);
        }
    });
}

// People cache, everything here..

function People() {
    this.userDetails = {}
    this.etou = {}
    sq('SELECT * FROM users;', (r) => {
        r.forEach(e => {
            this.userDetails[e.username] = { e }
            this.etou[e.email] = e.username
        });

        this.addPeople = function(arr) {
            if (arr['name'] && arr['email'] && arr['pass'] && arr['username']) this.userDetails[arr.username] = { arr }
        }
    })

}















//############################################### End of functions area ############################################
/*
let utona = {};
setInterval(function() {
    uton();
}, 60000);
uton();*/
//########################################## WEBSOCKET STARTS HERE ############################################################
let clients = {};
//  clients -> username -> [online, ws, lastseen]
//
const wss = new websocket.Server({ server: httpServer });

wss.on('connection', function(ws, request, client) {
    ws.isAlive = true;
    //console.log(ws);
    ws.on('message', function incoming(data) {
        //console.log(data);
        try { data = JSON.parse(data); } catch (e) { console.error('ws data not a valid json string', e); }
    });

})

wss.on('close', function close() {
    clearInterval(interval);
});

//########################################## WEBSOCKET ENDS HERE ############################################################
//#################################### WEBSOCKET SWITCH CASE FUNCTIONS #######################################################





//#################################### WEBSOCKET SWITCH CASE FUNCTIONS #######################################################

let sessionkey = function() {
    return Math.floor(Math.random() * Math.floor(9999999999));
}


app.post('/subscribe', function(req, res) {
    // webpush init
    const subscription = req.body;
    console.log(subscription);
    res.status(201).json({});
    webpush.sendNotification(subscription, JSON.stringify({ 'title': 'hiiiii' })).catch(err => console.error(err));
});

app.post('/checkSignin', function(req, res) {
    //check signed status
});

app.route('/login').post((req, res, next) => {

}).get((req, res) => {
    res.sendFile(path.join(__dirname, 'achat_enh', 'login.html'));
});

app.post('/logout', (req, res) => {
    //logout here
});

// 1) Add a route that answers to all request types
app.route('/signup').post((req, res) => {
    //signup here
}).get((req, res) => {
    res.sendFile(path.join(__dirname, 'achat_enh', 'login.html'));
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'achat_enh', 'login.html'));
});

httpServer.listen(port, () => {
    console.log('listening on ' + port);
});