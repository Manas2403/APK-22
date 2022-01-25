// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/gameWorld/components/barriers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Barrier = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ctx;
var canvas;

var Barrier = /*#__PURE__*/function () {
  function Barrier(canvasRef, ctxRef, playerRef, platformRef) {
    _classCallCheck(this, Barrier);

    canvas = canvasRef;
    ctx = ctxRef;
    this.width = 50 * Math.random() + 20;
    this.height = 50 * Math.random() + 40;
    this.position = {
      x: (platformRef.width - canvas.width / 2) * Math.random() + canvas.width / 2,
      y: platformRef.position.y - this.height
    };
  }

  _createClass(Barrier, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Barrier;
}();

exports.Barrier = Barrier;
},{}],"src/gameWorld/components/platform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ctx;
var canvas;

var Platform = /*#__PURE__*/function () {
  function Platform(canvasRef, ctxRef) {
    _classCallCheck(this, Platform);

    canvas = canvasRef;
    ctx = ctxRef;
    this.width = canvas.width * 4;
    this.height = 50;
    this.position = {
      x: 0,
      y: canvas.height - this.height
    };
  }

  _createClass(Platform, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Platform;
}();

exports.Platform = Platform;
},{}],"src/gameWorld/components/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ctx;

var Player = /*#__PURE__*/function () {
  function Player(ctxRef) {
    _classCallCheck(this, Player);

    ctx = ctxRef;
    this.position = {
      x: 100,
      y: 100
    };
    this.velocity = {
      x: 10,
      y: 0
    };
    this.gravity = 0.5;
    this.width = 30;
    this.height = 30;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Player;
}();

exports.Player = Player;
},{}],"src/gameWorld/systems/playerUpdate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePlayer = void 0;

var updatePlayer = function updatePlayer(canvas, player, platform, barriers) {
  player.draw();
  player.position.y += player.velocity.y;
  platform.position.x -= player.velocity.x;
  barriers.forEach(function (barrier) {
    barrier.position.x -= player.velocity.x;
  });

  if (player.position.y + player.height + player.velocity.y + platform.height <= canvas.height || platform.position.x + platform.width <= player.position.x) {
    player.velocity.y += player.gravity;
  } else {
    player.velocity.y = 0;
  }
};

exports.updatePlayer = updatePlayer;
},{}],"src/gameWorld/systems/controls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimation = void 0;

var _playerUpdate = require("./playerUpdate");

var createAnimation = function createAnimation(canvas, ctx, player, platform, barriers) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  (0, _playerUpdate.updatePlayer)(canvas, player, platform, barriers);
  platform.draw();
  barriers.forEach(function (barrier) {
    barrier.draw();
  });
  requestAnimationFrame(function () {
    createAnimation(canvas, ctx, player, platform, barriers);
  });
};

exports.createAnimation = createAnimation;
},{"./playerUpdate":"src/gameWorld/systems/playerUpdate.js"}],"src/gameWorld/systems/playerControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlayerControl = void 0;

var createPlayerControl = function createPlayerControl(canvas, player) {
  addEventListener("keydown", function (_ref) {
    var code = _ref.code;

    if (code === "Space") {
      if (player.position.y >= canvas.height / 2) {
        player.velocity.y -= 10;
      }
    }
  });
};

exports.createPlayerControl = createPlayerControl;
},{}],"src/gameWorld/World.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = void 0;

var _barriers = require("./components/barriers");

var _platform = require("./components/platform");

var _player = require("./components/player");

var _controls = require("./systems/controls");

var _playerControl = require("./systems/playerControl");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ctx;

var World = /*#__PURE__*/_createClass(function World(canvas) {
  _classCallCheck(this, World);

  ctx = canvas.getContext("2d");
  var player = new _player.Player(ctx);
  var platform = new _platform.Platform(canvas, ctx);
  var barriers = [];

  for (var i = 0; i < Math.random() * 5 + 10; ++i) {
    barriers.push(new _barriers.Barrier(canvas, ctx, player, platform));
  }

  (0, _controls.createAnimation)(canvas, ctx, player, platform, barriers);
  (0, _playerControl.createPlayerControl)(canvas, player);
});

exports.World = World;
},{"./components/barriers":"src/gameWorld/components/barriers.js","./components/platform":"src/gameWorld/components/platform.js","./components/player":"src/gameWorld/components/player.js","./systems/controls":"src/gameWorld/systems/controls.js","./systems/playerControl":"src/gameWorld/systems/playerControl.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _World = require("./gameWorld/World");

var main = function main() {
  var canvas = document.querySelector("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  var gameWorld = new _World.World(canvas);
};

main();
addEventListener("resize", function () {
  main();
});
},{"./gameWorld/World":"src/gameWorld/World.js"}],"../../../../mnt/c/Users/Acer/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46073" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../mnt/c/Users/Acer/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map