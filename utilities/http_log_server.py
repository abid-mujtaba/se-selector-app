"""
Modified from: https://gist.github.com/mdonkers/63e115cc0c79b4f6b8b3a6b797e485c7

The original source has the following license info:

------------------------------------------------------
License: MIT License
Copyright (c) 2023 Miel Donkers
------------------------------------------------------

Very simple HTTP server in python for logging requests
Usage::
    ./server.py
"""

from http.server import BaseHTTPRequestHandler, HTTPServer
import logging


class RequestHandler(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        logging.info(
            "GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers)
        )
        self._set_response()
        self.wfile.write("GET request for {}".format(self.path).encode("utf-8"))

    def do_POST(self):
        content_length = int(
            self.headers.get("Content-Length", 0)
        )  # <--- Gets the size of data
        post_data = self.rfile.read(content_length)  # <--- Gets the data itself

        # logging.info(
        #     "POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
        #     str(self.path),
        #     str(self.headers),
        #     post_data.decode("utf-8"),
        # )

        print(post_data.decode("UTF-8"))

        self._set_response()
        self.wfile.write("POST request for {}".format(self.path).encode("utf-8"))

    def log_message(self, *args, **kwargs):
        """Override log message to focus only on the recieve POST messages."""
        pass


def run(port=6000):
    logging.basicConfig(level=logging.INFO)

    server_address = ("0.0.0.0", port)
    httpd = HTTPServer(server_address, RequestHandler)

    logging.info("Starting httpd...\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

    httpd.server_close()

    print()
    logging.info("Stopping httpd...\n")


if __name__ == "__main__":
    run()
