#!/usr/bin/env node

'use strict';

var async = require('async');
var DDPClient = require('ddp');
var debugPkg = require('debug');

var ddpDebug = debugPkg('ddp');
var debug = debugPkg('atmosphere');

function setupArgs(callback) {
  debug('setupArgs');
  var data = {};
  var packages = process.argv.slice(2);
  if (packages.length !== 1) {
    console.error('Usage: ' + process.argv[1] + ' METEOR_PACKAGE');
    process.exit(1);
  }
  data.meteorPackageName = packages[0];
  callback(null, data);
}

function setupDdp(data, callback) {
  debug('setupDdp');
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

function subscribe(data, callback) {
  debug('subscribe');
  data.ddpclient.subscribe(
    'package',
    [data.meteorPackageName],
    function () {
      callback(null, data);
    }
  );
}

function dump(data, callback) {
  debug('dump');
  console.log(JSON.stringify(data.ddpclient.collections.packages));
  callback(null, data);
}

function unsubscribe(data, callback) {
  debug('unsubscribe');
  data.ddpclient.unsubscribe('package');
  callback(null, data);
}

function close(data, callback) {
  debug('close');
  data.ddpclient.close();
  callback(null, data);
}

debug('start');
async.waterfall([
  setupArgs,
  setupDdp,
  connect,
  subscribe,
  dump,
  unsubscribe,
  close,
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
