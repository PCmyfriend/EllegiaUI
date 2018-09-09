/* eslint-disable consistent-return */
export default (url, options) =>
  fetch(url, options)
    .then(response => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob =>
      URL.createObjectURL(blob.slice(0, blob.size, 'application/pdf')),
    )
    .then(fileUrl => {
      window.open(fileUrl);
    });
