function hooks() {
    this.After(function () {
        const server = this.server;
        return new Promise(function(resolve, reject) {
            server.stop(err => {
                if (err) reject(err);
                resolve(true);
            })
        });
    });
}

module.exports = hooks;