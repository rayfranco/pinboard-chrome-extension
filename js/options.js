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

	// Execute on load
	for (option in options) {
		if (localStorage["pinboard".camelCaseConcat(option)]) {
			options[option].el.val(localStorage["pinboard".camelCaseConcat(option)])
		}
	}
	if (!localStorage.pinboardIsAuth || localStorage.pinboardIsAuth != "YES") {
		$('#loginFieldset').find('div.control-group').removeClass('success').addClass('error');
	} else {
		$('#loginFieldset').find('div.control-group').addClass('success').removeClass('error');
	}

	// Events
	$('#loginFieldset input').on('change',function(e){
		$('#loginFieldset').find('div.control-group').removeClass('success error');
	});
	$('#optionsForm').submit(function(e){
		$('#formSubmit').addClass('disabled');
		e.preventDefault();
		for (option in options) {
			if (options[option].el.val() !== options[option].defaultValue) {
				localStorage["pinboard".camelCaseConcat(option)] 
					= options[option].defaultValue
					= options[option].el.val();
			}
		}
		// Authentication
		pinboard.authenticate(localStorage.pinboardUsername, localStorage.pinboardPassword, function(data){
			$('#loginFieldset').find('div.control-group').addClass('success').removeClass('error');
			$('#formSubmit').removeClass('disabled');
			localStorage.pinboardIsAuth = 'YES';
		}, function(xhr, errorType, error) {
			$('#loginFieldset').find('div.control-group').removeClass('success').addClass('error');
			$('#formSubmit').removeClass('disabled');
			localStorage.pinboardIsAuth = 'NO';
		});
	});
});