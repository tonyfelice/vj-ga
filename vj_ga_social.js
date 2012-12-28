/* Inspired by Tom Anthony http://www.seomoz.org/blog/visitor-social-network-login-status-google-analytics

USAGE
<script src="vj_ga_social.js"></script>
<script>
    testSocial({
        facebook: 'exampleAppId1234567890'
    });
</script>
 
 
 
 */
(function (window, undefined) {
	var beacon
	,loadScr = function(src){  //handler for loading scripts
	    var doc = window.document
	    ,tag = 'script'
	    ,g=doc.createElement(tag)
	    ,s=doc.getElementsByTagName(tag)[0];
	    g.src=src;
	    s.parentNode.insertBefore(g,s);
	}
	,loadImg = function(src, name){ //handler for loading images
	    var i = new Image();
	    i.onload=function(){logStatus(name, true); i = i.onload = i.onerror = undefined; };
	    i.onerror=function(){logStatus(name, false); i = i.onload = i.onerror = undefined; };
	    i.src=src;
	}
	,logStatus = function(network, status) { //handler for status
	    if(status){  //only tracking positives
		window._gaq.push(['_trackEvent', 'social login status', network, 'logged in',  undefined, 1]);
	    }
	}
	,beacons = { //this is the json that controls which networks are supported.  beacon (object) whose only child is src trigger handiling via image. beacon with src and init children are handled as script
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
	,init = function () {  //loop the beacons json and handle accordingly.
	    for (var name in beacons) {
		beacon = beacons[name];
		if (beacon.appId) {
		    loadScr(beacon.src);
		    beacon.init(name);
		} else if (beacon.src && !beacon.init) {
		    loadImg(beacon.src, name);
		}
	    }
	}
	,testSocial = function (opts) {  //init the function using the object passed to function, which comes through as opts
	    if (opts.facebook) {
		beacons.facebook.appId = opts.facebook;
	    }
	    if (opts.callback) {  //override native logStatus handler with custom callback
		logStatus = opts.callback;
	    }
	    init();
	};
	window.testSocial = testSocial;
}(window));