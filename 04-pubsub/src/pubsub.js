/*var pubsub = (function(){	
	var subscriptions = {}
	
	return function pubsub(evtName){
		subscriptions[evtName] = subscriptions[evtName] || [];
		var evtSubscriptions = subscriptions[evtName]; 
		
		function subscribe(){
			var fns = Array.from(arguments);
			fns.forEach(function(subscriptionFn){
				evtSubscriptions.push(subscriptionFn);	
			});
			return this;
		}

		function unsubscribe(){
			var fns = Array.from(arguments);
			fns.forEach(function(subscriptionFn){
				var idx = evtSubscriptions.indexOf(subscriptionFn);
				if (idx >= 0)
					evtSubscriptions.splice(idx, 1);
			});
			return this;
		}

		function publish(){
			var args = arguments;
			evtSubscriptions.forEach(function(evtSubscription){
				evtSubscription.apply(undefined, args);
			});
			return this;
		}

		return {
			subscribe : subscribe,
			unsubscribe : unsubscribe,
			publish : publish
		}
	}

})();*/


var pubsub = (function(){
	
	var _pubsub_intances = {};

	function PubSub(evtName){
		this._evtName = evtName;
		this._evtSubscriptions = [];
	}
	PubSub.prototype.subscribe = function(){
		var fns = Array.from(arguments),
			self = this;
		fns.forEach(function(subscriptionFn){
			self._evtSubscriptions.push(subscriptionFn);	
		});
		return self;
	}
	PubSub.prototype.unsubscribe = function() {
		var fns = Array.from(arguments),
			self = this;
		fns.forEach(function(subscriptionFn){
			var idx = self._evtSubscriptions.indexOf(subscriptionFn);
			if (idx >= 0)
				self._evtSubscriptions.splice(idx, 1);
		});
		return self;
	};

	PubSub.prototype.publish = function() {
		var args = arguments;
		this._evtSubscriptions.forEach(function(evtSubscription){
			evtSubscription.apply(undefined, args);
		});
		return this;
	};

	return function(evtName){
		_pubsub_intances[evtName] = _pubsub_intances[evtName] || new PubSub(evtName);
		return _pubsub_intances[evtName];
	}
})();
