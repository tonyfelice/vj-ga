/*
 * USAGE
<script src="vj_ga_social.js"></script>
<script>
    testSocial({
        facebook: 'facebook_app_id'
    });
</script>
 *
 *
 *
 */
(function (window, undefined) {
	var beacon
	,loadScr = function(src){
	    var doc = window.document
	    ,tag = 'script'
	    ,g=doc.createElement(tag)
	    ,s=doc.getElementsByTagName(tag)[0];
	    g.src=src;
	    s.parentNode.insertBefore(g,s);
	}
	,loadImg = function(src, name){
	    var i = new Image();
	    i.onload=function(){logStatus(name, true); i = i.onload = i.onerror = undefined; };
	    i.onerror=function(){logStatus(name, false); i = i.onload = i.onerror = undefined; };
	    i.src=src;
	}
	,logStatus = function(network, status) {
	    if(status){
		//window._gaq.push(['_trackEvent', 'social', network, 'logged in',  undefined, 1]);
	    }
	    console.log(network +' '+ status);
	}
	,beacons = {
		twitter: {
		    src: 'https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif'
		}
		,facebook: {
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
	,init = function () {
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
	,testSocial = function (opts) {
	    window._gaq = window._gaq || [];
	    if (opts.facebook) {
		beacons.facebook.appId = opts.facebook;
	    }
	    if (opts.callback) {
		logStatus = opts.callback;
	    }
	    init();
	};
	window.testSocial = testSocial;
}(window));