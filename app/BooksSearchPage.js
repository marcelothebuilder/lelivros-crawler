const WebCrawler = require('./WebCrawler');
const BookDetailsPage = require('./BookDetailsPage');

class BooksSearchPage {
    static fetchByPageIndex(pageIndex) {
        return WebCrawler.fetch(`${BooksSearchPage.ROOT}${pageIndex}`)
            .then(($) => {
                return new BooksSearchPage($);
            });
    }

    constructor($) {
        this.$ = $;
    }

    detailsLinks() {
        let $ = this.$;
        let links = $('.button.product_type_simple');
        let urls = links.map((_, element) => $(element).attr('href')).get();
        return urls;
    }

    fetchDetailsPages() {
        return Promise.all(this.detailsLinks().map(BookDetailsPage.fetchByUrl));
    }
}

BooksSearchPage.ROOT = 'https://lelivros.pro/book/page/';

module.exports = BooksSearchPage;
