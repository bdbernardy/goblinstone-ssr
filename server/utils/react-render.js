const {renderToNodeStream} = require('react-dom/server');

module.exports.renderToString = (reactMarkup) => new Promise((resolve, reject) => {
  const stream = renderToNodeStream(reactMarkup);

  let body = [];
  stream.on('error', (err) => {
    reject(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    const reactString = Buffer.concat(body).toString();
    resolve(reactString);
  });
});
