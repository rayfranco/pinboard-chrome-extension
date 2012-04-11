$(function(){

	String.prototype.camelCaseConcat = function() {
		var strings = new Array();
		for (i in arguments) {
			if (typeof arguments[i] == 'string') {
				strings.push(arguments[i].charAt(0).toUpperCase() + arguments[i].slice(1));
			}
		}
		return this.valueOf() + strings.join('');
	}

	var options = {
		username: {el: $('#usernameInput'), defaultValue: $('#usernameInput').val()},
		password: {el: $('#passwordInput'), defaultValue: $('#passwordInput').val()}
	}

	for (option in options) {
		if (localStorage["pinboard".camelCaseConcat(option)]) {
			options[option].el.val(localStorage["pinboard".camelCaseConcat(option)])
		}
	}

	setInterval(function(){
		for (option in options) {
			if (options[option].el.val() !== options[option].defaultValue) {
				localStorage["pinboard".camelCaseConcat(option)] 
					= options[option].defaultValue
					= options[option].el.val();
				// Should we try to authenticate now ? Maybe if we turn down automatic updates.
			}
		}
	},1000);
});