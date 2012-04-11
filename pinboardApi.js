// Light Pinboard API implementation with Zepto
(function($){
	var apiSettings = {
		add: {url: 'https://api.pinboard.in/v1/posts/add', method: 'GET'}
	}
	var API = function(){
		return this;
	};
	API.prototype.apiRequest = function(type,params,success,error) {
		if (!apiSettings[type]) {
			throw (new Error("This api request type is unrecognized"));
		}
		for (param in params) {
			if (!params[param].length) {
				delete params[param];
			}
		}
		console.log(params);
		$.ajax({
			url: apiSettings[type].url,
			type: apiSettings[type].method,
			dataType: 'xml',
			data: params,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.pinboardUsername + ":" + localStorage.pinboardPassword));
			},
			success: function(data) {
				if (typeof success == 'function') success(data);
			}
		});
	}
	API.prototype.add = function(url, title, description, tags, callback) {
		this.apiRequest('add',{
			url: url,
			description: title,
			extended: description
		},function(data){
			if (typeof callback == 'function') callback(data);
		},function(){
			throw (new Error("Can't connect with Pinboard.in API"));
		});
	}
	window.pinboard = new API();
})(Zepto);