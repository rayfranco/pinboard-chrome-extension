// Catching background
var background = chrome.extension.getBackgroundPage();
window.pinboard = background.pinboard;

(function($){

	// Set the default values
	chrome.tabs.getSelected(null,function(tab){
		$('#inputTitle').val(tab.title);
		$('#inputUrl').val(tab.url);
	});

	// Make sure the user is authenticated
	if (!localStorage.pinboardIsAuth || localStorage.pinboardIsAuth !== "YES") {
		$('#buttonSubmit').after(' <a href="'+ chrome.extension.getURL("options.html") +'" target="_blank" id="buttonOptions" class="btn btn-primary pull-right">Log in to Pinboard.in</a>');
		$('#container').before('<div class="mask"></div>');
	}

	// Listening bookmark event
	$('#buttonSubmit').on('click',function(e){

		$(e.target).addClass('disabled');

		var formEls = {
			url: $('#inputUrl'),
			title: $('#inputTitle'),
			description: $('#inputDescription'),
			tags: $('#inputTags'),
			privateState: $('#checkboxPrivate')
		};

		// Add the bookmark
		pinboard.add(formEls.url.val(), formEls.title.val(), formEls.description.val(), formEls.tags.val(), function(data){
			$(e.target).removeClass('disabled');
			window.close();
		});
	});
})(Zepto);