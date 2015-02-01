// Support different versions of IndexedDB
var idb = window.indexedDB || window.webkitIndexedDB ||
  window.mozIndexedDB || window.msIndexedDB;

var FoxiDB = {
  init: function db_init(callback) {
    this.db.open(callback);
  },

  addImage: function db_addImage(uri, size, data) {
    this.db.createImage(uri, size, data);
  },

  getImage: function db_getImage(uri, size, callback) {
    this.db.getImage(uri, size, callback);
  },

  clearImages: function db_clearImages(callback) {
    this.db.clearImages(callback);
  }
};

FoxiDB.db = {
  _db: null,
  upgradeFrom: -1,

  open: function db_open(callback) {
    var DB_VERSION = 1;
    var DB_NAME = 'foxi';
    var request = idb.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (function onUpgradeNeeded(e) {
      console.log('Foxi database upgrade needed, upgrading.');
      this.upgradeFrom = e.oldVersion;
      this._db = e.target.result;
      this.upgrade();
    }).bind(this);

    request.onsuccess = (function onSuccess(e) {
      this._db = e.target.result;
      callback();
      if (this.upgradeFrom != -1)
        FoxiDB.populate(this.upgradeFrom);
    }).bind(this);

    request.onerror = (function onDatabaseError(e) {
      console.log('Error opening foxi database');
    }).bind(this);
  },

  upgrade: function db_upgrade() {
    var db = this._db;
    var upgradeFrom = this.upgradeFrom;

    if (upgradeFrom < 1) {
      var imgCache = db.createObjectStore('imgCache', { keyPath: 'uri' });
    }
  },

  createImage: function db_createImage(uri, size, data) {
    var transaction = this._db.transaction(['imgCache'], 'readwrite');
    var imgData = { uri: size+"@"+uri, data: data };
    var objectStore = transaction.objectStore('imgCache');
    var writeRequest = objectStore.add(imgData);

    writeRequest.onsuccess = function onWriteSuccess(event) {
      console.log('successfully wrote image data ' + imgData.uri);
    };

    writeRequest.onerror = function onError(event) {
      console.log('error writing image data:' + imgData.uri);
    };

    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to save image data ' + imgData.uri);
    };
  },

  getImage: function db_getPlace(uri, size, callback) {
    var db = this._db;
    var request = db.transaction('imgCache').objectStore('imgCache').get(size+"@"+uri);

    request.onsuccess = function onSuccess(event) {
      callback(event.target.result);
    };

    request.onerror = function onError(event) {
      if (event.target.errorCode == IDBDatabaseException.NOT_FOUND_ERR)
        callback();
    };
  },

  clearImages: function db_clearImages(callback) {
    var db = FoxiDB.db._db;
    var transaction = db.transaction('imgCache', 'readwrite');
    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to clear images');
    };
    var objectStore = transaction.objectStore('imgCache');
    var request = objectStore.clear();
    request.onsuccess = function onSuccess() {
      callback();
    };
    request.onerror = function onError(e) {
      console.log('Error clearing images object store');
    };
  }
};

module.exports = FoxiDB;
window.clearImgCache = FoxiDB.clearImages.bind(FoxiDB);
