const http = require('http');

const server = http.createServer((req, res) => {
    const {url, method} = req
    res.writeHead(200, {"Content-Type":"text/html"})

    if (url === '/') {
        res.write(`
        <form action="/create-user" method="post">
            <input type="text" name="userName" placeholder="user"/>
            <input type="submit" value="submit"/>
        </form>`)
        res.end();
    }else if (url === '/users') {
        res.write(`
        <div>
            <h1>hello from the user page</h1>
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        </div>`)
        res.end();
    }else if (url === "/create-user" && method === "POST") {
        const data = [];
        let userName = '';
        req.on("data",chunk => data.push(chunk))
        req.on("end", () => {
            userName = Buffer.concat(data).toString().split("=")[1];
            console.log(userName)
            url.length = 0;
        })       
    } else {
        res.write(`<p>somewhere else</p>`)
        res.end();        
    }
})

server.listen(3000)

// next to do:
// store users in file,
// after sending - redirect to /users page and add new user