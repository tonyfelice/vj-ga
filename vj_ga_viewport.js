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
    
    //track viewport dimensions
    function logViewport(state){
	win.width = document.documentElement.clientWidth;
	win.height = document.documentElement.clientHeight;
	win.layout = (win.width > win.height) ? 'landscape' : 'portrait';
	if(state != 'initial' && (win.height == win.preW && win.width == win.preH)){
	    state = 'flip';
	}
	
	if(typeof(_vj.debug) !== 'undefined' && _vj.debug == true){
	    console.log(state);
	    console.log(win.width);
	    console.log(win.height);
	    console.log(win.layout);
	}else{
	    _gaq.push(['_trackEvent', 'viewport', state +' dims', win.width+'x'+win.height, 0, true]);
	    _gaq.push(['_trackEvent', 'viewport', state +' layout', win.layout, 0, true]);
	    _gaq.push(['_trackEvent', 'viewport', state +' width', win.width, 0, true]);
	}
	
	//reset the placeholder vars
	win.preW = win.width;
	win.preH = win.height;
    }
    logViewport('initial');
    
    //track viewport dimensions being changed by resize (throttled)
    var tmpTimer;
    jQuery(window).resize(function(){
	clearTimeout(tmpTimer);
	tmpTimer = setTimeout(function(){
	    logViewport('resize');
	}, 500);
    });
});
