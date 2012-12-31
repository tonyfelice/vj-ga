/*
inspired by Pete Miller http://wishfulcode.com/2011/11/02/measuring-viewport-size-with-google-analytics/

*/

//send to GA window viewport size on inital load and when resized as non-interactive events
jQuery(function() {
    //init
    var win = {
	width:0
	,height:0
	,preW:0
	,preH:0
	,layout:0
    };
    
    win.width = jQuery(window).width();
    win.height = jQuery(window).height();
    win.preW = win.width;
    win.preH = win.height;
    win.layout = (win.width > win.height) ? 'landscape' : 'portrait';
    
    //track viewport dimensions
    /*
    _gaq.push(['_trackEvent', 'viewport', 'initial dims', win.width+'x'+win.height, 0, true]);
    _gaq.push(['_trackEvent', 'viewport', 'initial layout', win.layout, 0, true]);
    _gaq.push(['_trackEvent', 'viewport', 'initial width', win.width, 0, true]);
    */
    
    console.log(win.width);
    console.log(win.height);
    console.log(win.layout);
    
    
    //track viewport dimensions being changed by resize (throttled)
    var tmpTimer;
    jQuery(window).resize(function(){
	clearTimeout(tmpTimer);
	tmpTimer = setTimeout(function(){
	    
	}, 500);
    });
});
