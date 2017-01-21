import App from "app";

function Movies() {
    this.serviceName = "Movies";
    this.basepath = "//www.omdbapi.com/";

    this.Request = App.ServicesContainer.get("AJAX");
    this.EM = App.EventManager;
}

Movies.prototype.search = function (term, onSuccess, onError) {
    this.Request.send('get', this.basepath, {s: term}, function (res) {
        onSuccess(res.body.Search || []);
    }, onError);
}

export default Movies;
