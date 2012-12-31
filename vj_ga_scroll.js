/*
based on work by
Justin Cutroni
Nick Mihailovski
Thomas Baekdal
Avinash Kaushik
Joost de Valk
Eivind Savio
 
http://cutroni.com/blog/2012/02/21/advanced-content-tracking-with-google-analytics-part-1/

*/

jQuery(function($) {
    // Debug flag
    var debugMode = true;

    // Default time delay before checking location
    var callBackTime = 100;

    // # px before tracking a reader
    var readerLocation = 150;

    // Set some flags for tracking & execution
    var timer = 0;
    var scroller = false;
    var endContent = false;
    var didComplete = false;

    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;

    // Track the aticle load?
    //_gaq.push(['_trackEvent', 'scrolling', 'loaded', '', 0, true]);
    
    //process the timer
    function doTime(a, b){
	return (Math.round((a - b) / 100)/10).toString() + ' sec';
    }

    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();
	console.log($(window).scrollTop());

        // If user starts to scroll send an event
        if (bottom > readerLocation && !scroller) {
            currentTime = new Date();
            scrollStart = currentTime.getTime();
            //timeToScroll = Math.round((scrollStart - beginning) / 1000).toString() + ' sec';
	    timeToScroll = doTime(scrollStart, beginning);
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'scrolling', 'startScroll', timeToScroll ]);
            } else {
                console.log('started reading ' + timeToScroll);
            }
            scroller = true;
        }

        // If user has hit the bottom of the content send an event
        /*if (bottom >= $('.entry-content').scrollTop() + $('.entry-content').innerHeight() && !endContent) {
            currentTime = new Date();
            contentScrollEnd = currentTime.getTime();
            timeToContentEnd = doTime(contentScrollEnd, scrollStart);
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'scrolling', 'ContentBottom', '', timeToContentEnd]);
            } else {
                console.log('end content section '+timeToContentEnd);
            }
            endContent = true;
        }*/

        // If user has hit the bottom of page send an event
        if (bottom >= height && !didComplete) {
            currentTime = new Date();
            end = currentTime.getTime();
            totalTime = doTime(end, scrollStart);
            if (!debugMode) {
                if (totalTime < 60) {
                    //_gaq.push(['_setCustomVar', 5, 'ReaderType', 'Scanner', 2]);
		    _gaq.push(['_trackEvent', 'engagement', location.pathname+' : scanner', totalTime ]);
                } else {
                    //_gaq.push(['_setCustomVar', 5, 'ReaderType', 'Reader', 2]);
		    _gaq.push(['_trackEvent', 'engagement', location.pathname+' : reader', totalTime ]);
                }
                _gaq.push(['_trackEvent', 'scrolling', 'pageBottom', totalTime ]);
            } else {
                console.log('bottom of page '+totalTime);
            }
            didComplete = true;
        }
	
	// If user returns to top send an event
        /*if (bottom > readerLocation && !scroller) {
            currentTime = new Date();
            scrollStart = currentTime.getTime();
            //timeToScroll = Math.round((scrollStart - beginning) / 1000).toString() + ' sec';
	    timeToScroll = doTime(scrollStart, beginning);
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'scrolling', 'startScroll', timeToScroll ]);
            } else {
                console.log('started reading ' + timeToScroll);
            }
            scroller = true;
        }*/

        
    }

    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }

        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});