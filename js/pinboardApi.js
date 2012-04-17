// Light Pinboard API implementation with Zepto
(function($){
	var apiSettings = {
		add: {url: 'https://api.pinboard.in/v1/posts/add', method: 'GET'},
		auth: {url: 'https://api.pinboard.in/v1/user/secret', method: 'GET'}
	}
	var API = function(){
		return this;
	};
	API.prototype.apiRequest = function(type,params,success,error) {

		// username and password are not intended to be in the request
		var user = params.user || localStorage.pinboardUsername,
			pass = params.password || localStorage.pinboardPassword;
		delete params.user;
		delete params.password;

		// Make sure the request type is registered
		if (!apiSettings[type]) {
			throw (new Error("This api request type is unrecognized"));
		}
		for (param in params) {
			if (!params[param].length) {
				delete params[param];
			}
		}
		$.ajax({
			url: apiSettings[type].url,
			type: apiSettings[type].method,
			dataType: 'xml',
			data: params,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
			},
			success: function(data) {
				if (typeof success == 'function') success(data);
			},
			error: function(xhr, errorType, err) {
				if (typeof error == 'function') error(xhr, errorType, err);
			}
		});
	}
	API.prototype.authenticate = function(username, password, callback, error) {
		this.apiRequest('auth',{
			user: username,
			password: password
		},function(data){
			if (typeof callback == 'function') callback(data);
		},function(xhr, errorType, err){
			if (typeof error == 'function') error(xhr, errorType, err);
		});
	}
	API.prototype.add = function(url, title, description, tags, callback, error) {
		this.apiRequest('add',{
			url: url,
			description: title,
			tags: tags,
			extended: description
		},function(data){
			if (typeof callback == 'function') callback(data);
		},function(xhr, errorType, err){
			if (typeof error == 'function') error(xhr, errorType, err);
		});
	}
	window.pinboard = new API();
})(Zepto);