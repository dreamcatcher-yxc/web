(function() {
  const worker = new Worker('./worker.js');
  worker.addEventListener('message', function(e) {
    console.log('worker message is: ', e.data);
  });
  worker.postMessage('hello world!');
})();