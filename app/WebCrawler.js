const requestp = require('request-promise');
const cheerio = require('cheerio');

class WebCrawler {
    static fetch(url) {
        console.log("fetch", url);
        return requestp({
            uri: url,
            transform: (body) => cheerio.load(body)
        });
    }
}

module.exports = WebCrawler;
