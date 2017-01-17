const WebCrawler = require('./WebCrawler');
const BookDownload = require('./BookDownload');

class BookDetailsPage {
    static fetchByUrl(url) {
        return WebCrawler.fetch(url)
            .then(($) => {
                return new BookDetailsPage($);
            });
    }

    constructor($) {
        this.$ = $;
    }

    title() {
        return this.$('.product_title.entry-title').text();
    }

    downloads() {
        let $ = this.$;
        return $('.links-download').find('a')
            .filter((_, a) => /ext=\./gi.test($(a).attr('href')))
            .map((_, a) => $(a).attr('href'))
            .get()
            .map((url) => BookDownload.createFromUrl(url, this));
    }
}

module.exports = BookDetailsPage;
