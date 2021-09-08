const http = require('http');
const exec = require('child_process').exec;

const hostname = '127.0.0.1';
const port = 7781;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/event/blog-refresh')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const refreshScript = exec('sh blog-refresh.sh');

    refreshScript.stderr.on('data', (data) => {
      console.error(data);
    });

    // TODO 执行错误返回error
    refreshScript.on('exit', () => {
      return res.end('ok!');
    });
  } else {
    res.statusCode = 400;
    return res.end('error!');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
