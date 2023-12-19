/*
 * Module for logging utilities.
 */

export { configureLogging, log };

let _url: string | null = null;

/*
 * Change port of current URL to 5100 to get port of HTTP Log Server
 */
function configureLogging(url: string): void {
    _url = url.replace("5000", "5100");
}

/*
 * Send log message to both console and HTTP Log Server.
 * Failure to send message to Log Server is ignored.
 */
async function log(message: string): Promise<void> {
    // Log to console first
    console.log(message);

    try {
        // Send log to HTTP Log Server
        await fetch(_url, {
            method: 'POST',
            body: message,
            mode: 'no-cors',
        });
    }
    catch(error) {
        console.error(error);
    }
}
