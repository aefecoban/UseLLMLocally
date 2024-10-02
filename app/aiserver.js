module.exports = class AIServer {

    ServerAddress = {
        host : "localhost",
        port : 8181,
        URLS : {
            loadDefaultModel : "/loadDefaultModel", // get
            models : "/models", // post
            loadModel : "/loadModel", // post
            message : "/message", // post
            cleareAllMessages : "/cleareAllMessages", // get
            removeChat : "/removeChat", // get
        }
    }

    constructor() {
        const args = process.argv;
        this.ServerAddress.port = 8181;

        args.forEach((arg) => {
            if (arg.startsWith("--port=") || arg.startsWith("port=")) {
                this.ServerAddress.port = parseInt(arg.split('=')[1], 10);
            }
        });

        this.#prepareUrls();
        console.log(this.ServerAddress.URLS);
    }

    #prepareUrls(){
        Object.keys(this.ServerAddress.URLS).forEach((key) => {
            this.ServerAddress.URLS[key] = `http://${this.ServerAddress.host}:${this.ServerAddress.port}${this.ServerAddress.URLS[key]}`;
        });
    }

    Start(){
        return new Promise((res, rej) => {
            fetch(this.ServerAddress.URLS.loadDefaultModel, {
                method: "GET",
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return res(true);
            })
            .catch(error => {
                console.error('Error:', error);
                return res(false);
            });
        })
    }

}