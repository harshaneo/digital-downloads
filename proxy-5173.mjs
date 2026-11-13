import http from 'node:http';

const server = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: '127.0.0.1',
    port: 5175,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    clientRes.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(clientRes, { end: true });
  });

  proxyReq.on('error', (err) => {
    clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
    clientRes.end(`Gateway error forwarding to 5175: ${err.message}`);
  });

  clientReq.pipe(proxyReq, { end: true });
});

server.listen(5173, '0.0.0.0', () => {
  console.log('Port forwarder listening on http://localhost:5173 (forwarding to 5175)');
});
