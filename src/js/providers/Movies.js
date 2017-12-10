import App from "app";

function Movies() {
    this.serviceName = "Movies";
    this.basepath = "//api.themoviedb.org/3/";

    this.Request = App.ServicesContainer.get("AJAX");
    this.EM = App.EventManager;
}

/**
 * @param {Object} complement
 * @return {Object}
 */
Movies.prototype.makePayload = function (complement = {}) {
    return Object.assign({
        api_key: App.config("TMDB_API_KEY"),
        language: App.config("LANGUAGE")
    }, complement);
}

Movies.prototype.search = function (term, page = 1) {
    return new Promise((resolve, reject) => {
        const payload = this.makePayload({
            query: term,
            page: page
        });

        this.Request.send('get', this.basepath + "search/multi", payload, (res) =>{
            resolve(res.body.results);
        }, (err) => {
            const errMessage = err.status && err.status == 401 ?
                "You're not authorized to access this resource. You should verify the TMDB_API_KEY config on '.env.js' file." :
                err.message;

            reject(errMessage);
        });
    });
}

/**
 * @param {String} type (person|tv|movie)
 * @param {Number} id
 * @return {Promise}
 */
Movies.prototype.get = function (type, id) {
    return new Promise((resolve, reject) => {
        this.Request.send(
            'get',
            `${this.basepath}${type}/${id}`,
            this.makePayload(),
            res => resolve(res.body),
            err => reject(err)
        );
    });
}

/**
 * @param {String} path
 * @param {String|Number} width
 * @reutrn {String}
 */
Movies.prototype.getPosterURL = (path, width = 300) => {
    return `http://image.tmdb.org/t/p/w${width}/${path}`;
}

export default Movies;
