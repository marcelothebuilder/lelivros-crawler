const BooksSearchPage = require('./BooksSearchPage');

class BookDownloadService {
    static downloadPage(pageIndex) {
        return BooksSearchPage.fetchByPageIndex(pageIndex)
            .then((booksSearch) => {
                return booksSearch.fetchDetailsPages()
                    .then((detailsPages) => {
                        detailsPages.forEach((page) => {
                            page.downloads().forEach((bookDownload) => {
                                let directory = './books/';
                                bookDownload.downloadTo(directory);
                            });
                        });
                    });
            });
    }
}

module.exports = BookDownloadService;
