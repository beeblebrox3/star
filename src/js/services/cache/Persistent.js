function isExpired(storedObject) {
    const now = new Date().getTime();

    return (now - storedObject.created_at) / 1000 > storedObject.ttl;
}

function Persistent(key, autosave) {
    this.buckets = {
        default: {}
    };

    this.currentBucket = this.buckets.default;
    this.key = key || "star_cache";
    this.autosave = autosave === undefined ? true : autosave;
    this.defaultTtl = 10;
    this._load();
}

Persistent.prototype.setAutosave = function (value) {
    this.autosave = value;
    return this;
};

Persistent.prototype.setDefaultTtl = function (ttl) {
    this.defaultTtl = parseInt(ttl, 10);
};

Persistent.prototype._save = function () {
    localStorage.setItem(this.key, JSON.stringify(this.buckets));
};

Persistent.prototype._load = function () {
    // debugger;
    try {
        let data = localStorage.getItem(this.key);
        data = JSON.parse(data);
        if (null !== data) {
            this.buckets = data;
            if (!this.buckets.hasOwnProperty("default")) {
                this.buckets.default = {};
            }
            this.currentBucket = this.buckets.default;
        }
    } catch (e) {
        console.log("failed to load data from local storage.");
    }
};

Persistent.prototype.has = function (key, checkExpired) {
    if (!this.currentBucket.hasOwnProperty(key)) {
        return false
    }

    if (true !== checkExpired) {
        return true;
    }

    const storedObject = this.currentBucket[key];
    return !isExpired(storedObject);
};

Persistent.prototype.get = function (key, defaultValue) {
    const returnDefault = () => {
        if (typeof defaultValue === "function") {
            return defaultValue();
        }

        return defaultValue
    };

    if (!this.has(key)) {
        return returnDefault();
    }

    const storedObject = this.currentBucket[key];
    if (isExpired(storedObject)) {
        delete this.currentBucket[key];
        return returnDefault();
    }

    if (Array.isArray(storedObject.value)) {
        return storedObject.value.slice();
    }

    if (typeof storedObject.value === "object") {
        return Object.assign({}, storedObject.value);
    }

    return storedObject.value;
};

Persistent.prototype.set = function (key, value, ttl) {
    const storeObject = {
        value: value,
        ttl: ttl || this.defaultTtl,
        created_at: new Date().getTime()
    };
    this.currentBucket[key] = storeObject;
    this.autosave && this._save();

    return this;
};

Persistent.prototype.setBucket = function (bucket) {
    if (!this.buckets.hasOwnProperty(bucket)) {
        this.buckets[bucket] = {};
    }

    this.currentBucket = this.buckets[bucket];
    return this;
};

Persistent.prototype.removeBucket = function (bucket) {
    if (this.buckets.hasOwnProperty(bucket)) {
        delete this.buckets[bucket];
        this.autosave && this._save();
    }
    this.setBucket("default");
    return this;
};

export default Persistent;
