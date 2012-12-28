/* Inspired by Tom Anthony http://www.seomoz.org/blog/visitor-social-network-login-status-google-analytics

USAGE
<script src="vj_ga_social.js"></script>
<script>
    testSocial({
        facebook: 'exampleAppId1234567890'
        ,callback: optionalFn
    });
</script>
 
 
 
 */
(function (window, undefined) {
	var beacon
	//handler for loading scripts
	,loadScr = function(src){  
	    var doc = window.document
	    ,tag = 'script'
	    ,g=doc.createElement(tag)
	    ,s=doc.getElementsByTagName(tag)[0];
	    g.src=src;
	    s.parentNode.insertBefore(g,s);
	}
	//handler for loading images
	,loadImg = function(src, name){ 
	    var i = new Image();
	    i.onload=function(){logStatus(name, true); i = i.onload = i.onerror = undefined; };
	    i.onerror=function(){logStatus(name, false); i = i.onload = i.onerror = undefined; };
	    i.src=src;
	}
	//handler for status - this can be overridden by defining callback in the caller object
	,logStatus = function(network, status) { 
	    if(status){  //here, only tracking positives
		window._gaq.push(['_trackEvent', 'social login status', network, 'logged in',  undefined, 1]);
	    }
	}
	//define and configure which networks are supported.  beacon (object) whose only child is src trigger handiling via image. beacon with src and init children are handled as script
	,beacons = { 
		/*
		 * facebook has a supported API method to check login status without interaction.
		 * Pass the beaconName ("facebook") as an array key when calling the testSocial function.
		 * The value of the array key should be the appId from fb.
		 * 
		 */
		facebook: { 
		    src: '//connect.facebook.net/en_US/all.js',
		    init: function(name){
			window.fbAsyncInit = function(){
			    FB.init({ appId:this.appId, status:true, cookie:true, xfbml:true});
			    FB.getLoginStatus(function(response){
				logStatus(name, response.status!=='unknown');
			    });
			};
		    }
		}
		/*
		 * the rest of these networks don't have supported methods, so we're requesting images that are restricted to logged in users, and triggering onload / onerror accordingly
		 */
		,twitter: {
		    src: 'https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif'
		}
		,google: {
		    src: 'https://accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png'
		}
		,google_plus: {
		    src: 'https://plus.google.com/up/?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png&type=st&gpsrc=ogpy0'
		}
		,pinterest: {
		    src: 'https://pinterest.com/login/?next=https://s-passets-ec.pinimg.com/images/load2.gif'
		}
	}
	//define the main routine using any objects passed to function
	,testSocial = function (opts) {  
	    if (opts.facebook) {
		beacons.facebook.appId = opts.facebook;
	    }
	    if (opts.callback) {  //override native logStatus handler with custom callback
		logStatus = opts.callback;
	    }
	    init();
	}
	//do the work
	,init = function () {  
	    //loop the beacons json and handle accordingly
	    for (var name in beacons) {
		beacon = beacons[name];
		if (beacon.appId) {  //fb is defined, but will not fire unless appId is handed to the fn when called by window
		    loadScr(beacon.src);
		    beacon.init(name);
		} else if (beacon.src && !beacon.init) { // !beacon.init is an important test to determine which handler we really need
		    loadImg(beacon.src, name);
		}
	    }
	};
	window.testSocial = testSocial;  //promote the fn to global
}(window));