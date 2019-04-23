var pubsub = (function(){	
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

})();