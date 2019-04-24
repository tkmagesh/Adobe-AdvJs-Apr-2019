"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pubsub = function () {
  var _pubsub_intances = {};
  var subscriptionSymbol = Symbol();

  var PubSub =
  /*#__PURE__*/
  function () {
    function PubSub(evtName) {
      _classCallCheck(this, PubSub);

      this._evtName = evtName;
      this[subscriptionSymbol] = [];
    }

    _createClass(PubSub, [{
      key: "subscribe",
      value: function subscribe() {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.forEach(function (subscriptionFn) {
          return _this[subscriptionSymbol].push(subscriptionFn);
        });
        return this;
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {
        var _this2 = this;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args.forEach(function (subscriptionFn) {
          var idx = _this2[subscriptionSymbol].indexOf(subscriptionFn);

          if (idx >= 0) _this2[subscriptionSymbol].splice(idx, 1);
        });
        return this;
      }
    }, {
      key: "publish",
      value: function publish() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        this[subscriptionSymbol].forEach(function (evtSubscription) {
          return evtSubscription.apply(void 0, args);
        });
        return this;
      }
    }]);

    return PubSub;
  }();

  return function (evtName) {
    _pubsub_intances[evtName] = _pubsub_intances[evtName] || new PubSub(evtName);
    return _pubsub_intances[evtName];
  };
}();