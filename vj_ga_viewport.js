/* Viewport detection

fires event on initial load and resize events, as well as height/width flipflop indicating device reorientation

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
	,maxW:0
    };
    
    //track viewport dimensions
    function logViewport(state){
	win.width = jQuery(window).width();
	win.height = jQuery(window).height();
	win.layout = (win.width > win.height) ? 'landscape' : 'portrait';
	win.maxW = window.screen.availWidth;
	if(state != 'initial' && (win.height == win.preW && win.width == win.preH)){
	    state = 'flip';
	}
	
	if(typeof(_vj.debug) !== 'undefined' && _vj.debug == true){
	    console.log(state);
	    console.log(win.width);
	    console.log(win.height);
	    console.log(win.layout);
	    console.log(win.maxW);
	}else{
	    _gaq.push(['_trackEvent', 'viewport', state +' layout', win.layout, 0, true]);
	    _gaq.push(['_trackEvent', 'viewport', state +' width', win.width.toString(), 0, true]);
	    _gaq.push(['_trackEvent', 'viewport', state +' height', win.height.toString(), 0, true]);
	    _gaq.push(['_trackEvent', 'viewport', state +' avail width', win.maxW.toString(), 0, true]);
	}
	
	//reset the placeholder vars
	win.preW = win.width;
	win.preH = win.height;
    }
    logViewport('initial');
    
    //resize listener
    var tmpTimer;
    jQuery(window).resize(function(){
	clearTimeout(tmpTimer);
	tmpTimer = setTimeout(function(){
	    logViewport('resize');
	}, 500);  //note: this timer is dormant UNLESS there's a resize event in play
    });
});
