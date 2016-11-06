function hooks() {
    this.After(function () {
        if (this.server) {
            const server = this.server;
            return new Promise(function(resolve, reject) {
                server.stop(err => {
                    if (err) reject(err);
                    resolve(true);
                })
            });
        }

        if (this.ruffianProcess) {
            this.ruffianProcess.on('close', (code, signal) => {
                console.log(
                    `child process terminated due to receipt of signal ${signal}`);
            });
            this.ruffianProcess.kill();
        }
    });
}

module.exports = hooks;