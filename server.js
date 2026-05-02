const http = require('http');
const fs = require('fs');
const os = require('os');

const PORT = 3000;
const log = 'visitors.log';
const backup = 'backup.log';

if(!fs.exixtsSync(log))
    fs.writeFileSync(log,' ');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/get/updateuser'){
        const entry = new Date().toISOString() + '\n';
        fs.appendFile(log, entry, err =>
            err ? send(500, {error: 'fail'}): send(200, {success: entry.trim()})
        );
    }

    else if(url === '/get/savelog'){
        fs.readFile(log, 'utf-8' , (err, data) => {
            if(err) return send(500, {error: 'fail'})
                else{send (200, {success: 'log saved'})}
        })
    }
    else if(url === '/post/backup' && method === 'post'){
        fs.copyFile(log, backup , err => {
            if(err) return send(500, {error: 'fail'})
                else{send (200, {backup : 'backup done'})}
        })
    }
    
});