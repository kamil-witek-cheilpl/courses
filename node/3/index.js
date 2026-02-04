const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const {url, method} = req

    if (url === '/' && method === "GET") {
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(`
        <form action="/create-user" method="post">
            <input type="text" name="userName" placeholder="user"/>
            <input type="submit" value="submit"/>
        </form>`)
    }else if (url === '/users' && method === "GET") {
        res.end(`
        <div>
            <h1>hello from the user page</h1>
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        </div>`)

    }else if (url === "/create-user" && method === "POST") {
        const data = [];
        let userName = '';
        let users = [];
        req.on("data",chunk => data.push(chunk))
        req.on("end", () => {
            userName = Buffer.concat(data).toString().split("=")[1];
            // fs.writeFileSync('./node/3/users.json', JSON.stringify({users: [...users]}))
            // console.log(prevFile)
            // const test = Buffer.concat(prevFile).toString();
            // console.log(test)
        })
        fs.readFile('./node/3/users.json', { encoding: 'utf-8' }, (err, prevData) => {
            if (err) {
                console.log('error reading users.json', err)
            } else {
                const prevUsers = JSON.parse(prevData).users || [];
                if (userName !== ''){
                    users = prevUsers.concat(userName)
                    fs.writeFile('./node/3/users.json',JSON.stringify({users:['afwa']}), {encoding: 'utf-8'},
                    (err) => {
    if (err) throw err;
    console.log('File written successfully');
  }
                )
                }
            }
        })
        console.log(users, 'users');

        res.writeHead(302, {
            Location: "/users"
        })
        res.end();
    } else {
        res.write(`<p>somewhere else</p>`)
        res.end();        
    }
})

server.listen(3000)

// next to do:
// store users in file,
// after sending - redirect to /users page and add new user