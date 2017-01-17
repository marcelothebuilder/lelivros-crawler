const http = require('http');
const fs = require('fs');
const sanitize = require("sanitize-filename");

const DIRECTORY_SEPARATOR_REGEXP = /\/|\\/g;

class BookDownload {
    static createFromUrl(url, bookDetailsPage) {
        return new BookDownload(url, bookDetailsPage.title());
    }

    constructor(url, title) {
        this._url = url;
        this._title = title;
    }

    title() {
        return this._title;
    }

    url() {
        return this._url;
    }

    extension() {
        return this._url.match(/\.(\w+)$/)[1];
    }

    downloadTo(directory) {
        return new Promise((resolve, reject) => {
            let fileWriteStream = this._createFileWriteStream(directory + [this.title(), this.extension()].join('.'));

            http.get(this._url, (fileDownloadStream) => {
                fileDownloadStream.pipe(fileWriteStream);
            });

            file.on('finish', () => {
                file.close(() => {
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(dest); // async
                reject(err);
            });
        })
    }

    _createFileWriteStream(path) {
        let sanitizedPath = path.split(DIRECTORY_SEPARATOR_REGEXP)
            .map((fileOrDirectory) => {
                if (fileOrDirectory === '..' || fileOrDirectory === '.') return fileOrDirectory;
                return sanitize(fileOrDirectory);
            })
            .join('/');

        return fs.createWriteStream(sanitizedPath);
    }
}

module.exports = BookDownload;
