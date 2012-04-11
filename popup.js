// Catching background
var background = chrome.extension.getBackgroundPage();
window.pinboard = background.pinboard;

(function($){
	// Set the default values
	chrome.tabs.getSelected(null,function(tab){
		$('#inputTitle').val(tab.title);
		$('#inputUrl').val(tab.url);
	});

	// Listening bookmark event
	$('#buttonSubmit').on('click',function(e){

		$(e.target).addClass('disabled');

		var formEls = {
			url: $('#inputUrl'),
			title: $('#inputTitle'),
			description: $('#inputDescription'),
			tags: $('#inputTags'),
			privateState: $('#inputTags')
		};

		// @todo: form verifications

		pinboard.add(formEls.url.val(), formEls.title.val(), formEls.description.val(), formEls.tags.val(), function(data){
			$(e.target).removeClass('disabled');
			window.close();
		});

	});
})(Zepto);