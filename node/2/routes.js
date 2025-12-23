const fs = require('fs');

import module from 'module';

const handleResponse = (req, res) => {
    console.log('is it even working')
    const {url, method} = req;
    if (url === "/") {
        res.write('<html>');
        res.write('<header><title>random title1</title></header>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"/><input type="submit" value="submit" /></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk start', chunk)
            body.push(chunk);
        })
        // this fire when event listener done his job
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            // writeFile is better than writeFileSync because it is not blocking code execution
            fs.writeFile('2/savedMessage.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<header><title>random title</title></header>');
    res.write('<body><h1>Hello from node server</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = handleResponse;
