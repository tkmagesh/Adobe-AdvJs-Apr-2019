var pubsub = (function(){
	
	let _pubsub_intances = {};

	let subscriptionSymbol = Symbol();

	class PubSub{

		constructor(evtName){
			this._evtName = evtName;
			this[subscriptionSymbol] = [];
		}

		subscribe(...args){
			args.forEach(subscriptionFn => this[subscriptionSymbol].push(subscriptionFn));	
			return this;
		}

		unsubscribe(...args) {
			args.forEach(subscriptionFn => {
				let idx = this[subscriptionSymbol].indexOf(subscriptionFn);
				if (idx >= 0)
					this[subscriptionSymbol].splice(idx, 1);
			});
			return this;
		}

		publish(...args) {
			this[subscriptionSymbol].forEach( evtSubscription => evtSubscription(...args));
			return this;
		};
	}

	return function(evtName){
		_pubsub_intances[evtName] = _pubsub_intances[evtName] || new PubSub(evtName);
		return _pubsub_intances[evtName];
	}
})();