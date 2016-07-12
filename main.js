'use strict';

var async = require('async');
var DDPClient = require('ddp');
var debugPkg = require('debug');

var ddpDebug = debugPkg('ddp');
var debug = debugPkg('atmosphere');

function setup(callback) {
  debug('setup');
  var data = {};
  data.ddpclient = new DDPClient({
    host: 'atmospherejs.com',
    port: 443,
    ssl: true,
    autoReconnect: false, // only re-connects, doesn't re-try first connect
    maintainCollections: true,
    ddpVersion: '1',
  });

  data.ddpclient.on('message', function (msg) {
    ddpDebug('DDP message: ' + msg);
  });

  data.ddpclient.on('socket-close', function(code, message) {
    ddpDebug('Socket closed. code=' + code + ' message=' + message);
  });

  data.ddpclient.on('socket-error', function(error) {
    ddpDebug('Socket error: ' + error.message);
  });

  callback(null, data);
}

function connect(data, callback) {
  debug('connect');
  data.ddpclient.connect(function(error, wasReconnect){
    if (error) {
      callback(error, data);
    }

    if (wasReconnect) {
      // we should never get here when autoReconnect is false
      console.error('Unexpected condition: connection reestablished.');
    }

    debug('Connected to Atmosphere');

    callback(null, data);
  });
}

function subscribe(publication, params, data, callback) {
  debug('subscribe');
  data.ddpclient.subscribe(
    publication,     // name of Meteor Publish function to subscribe to 
    params,          // any parameters used by the Publish function 
    function () {    // callback when the subscription is complete 
      callback(null, data);
    }
  );
}

function dump(collection, data, callback) {
  debug('dump');
  console.log(JSON.stringify(data.ddpclient.collections[collection]));
  callback(null, data);
}

function unsubscribe(publication, data, callback) {
  debug('unsubscribe');
  data.ddpclient.unsubscribe(publication);
  callback(null, data);
}

function close(data, callback) {
  debug('close');
  data.ddpclient.close();
  callback(null, data);
}

var publication = 'package';
var subscribeParams = ['csats:mturk'];
var collectionName = 'packages';

debug('start');
async.waterfall([
  function(callback) {
    setup(callback);
  },
  function(data, callback) {
    connect(data, callback);
  },
  // START - repeat for each package //
  function(data, callback) {
    subscribe(publication, subscribeParams, data, callback);
  },
  function(data, callback) {
    dump(collectionName, data, callback);
  },
  function(data, callback) {
    unsubscribe(publication, data, callback);
  },
  // END - repeat for each package //
  function(data, callback) {
    close(data, callback);
  }
], function(error, data) {
  if (error !== null) {
    debug('something broke the waterfall');
    debug('end - dirty waterfall');
    console.error(error);
  }
  debug('end - clean waterfall');
  if (!data) {
    console.error('code error: should have data object here');
  }
});
