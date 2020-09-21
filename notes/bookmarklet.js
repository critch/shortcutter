(function() {
	var doc = top.document,
	iframe = doc.getElementById("rebrandly_extension_foreground");
	if (iframe) {
		alert("Bookmarklet is already running...\n close it out first if you want to start over");
		//iframe.remove();
		iframe = doc.getElementById("rebrandly_extension_foreground");
	}

	var hostname = 'https://app.rebrandly.com';

  var href = top.location.href,
    title = doc.title,
		favicon = href + 'favicon.ico';

	var target_el_body = doc.body,
    iframe = document.createElement('iframe'),
    iframe_id = 'rebrandly_extension_foreground';

  iframe.setAttribute('id', iframe_id);

  var urlfrag = '/extension?url=' + encodeURIComponent(href) + '&title=' + encodeURIComponent(title) + '&favicon=' + encodeURIComponent(favicon) + '&oauth=true&hideLogout=true&hideOptions=true';

  var url = hostname + urlfrag;
	var loginUrl = hostname + '/bookmarklet-login'
	var style = 'height: 100%;width: 100%;position: fixed;top: 0;left: 0;z-index: 2147483646;display: block !important;'
	var required_origin = hostname;

  iframe.setAttribute('src', url);
	iframe.setAttribute('style', style);

  target_el_body.appendChild(iframe);

	var on_msg = function(e) {
    e = e || window.event;
    if (e.origin == required_origin) {
		var msg = e.data;
		
      	if (!!~msg.search(/close/) || !!~msg.search(/close_white_site/)) {
        	setTimeout(clear, 500);
      	}else if(!!~msg.search(/oauth_url=/)) {
			openInNewTab(msg.replace('oauth_url=', ''), '_blank');
		}else if(!!~msg.search(/openlogout=/)) {
			setTimeout(clear, 500);
			openInNewTab(msg.replace('openlogout=', ''), '_blank');
		}else if(!!~msg.search(/rebrandly_main/)){
			setTimeout(clear, 500);
			openInNewTab("https://app.rebrandly.com", '_blank');
		}else if(!!~msg.search(/rb_open_options/)){
			setTimeout(clear, 500);
		}else if(!!~msg.search(/logout/) || !!~msg.search(/logout_white_site/)){
			setTimeout(clear, 500);
			openInNewTab("https://app.rebrandly.com/sign-out", '_blank');
		}
    }
  }

	window.addEventListener("message", on_msg, false);

	function clear() {
		removeEventListener("message", on_msg)
		if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
	}

	function openInNewTab(url) {
	setTimeout(clear, 500);
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
	}
	

})();