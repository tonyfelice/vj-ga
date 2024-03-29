/*
                                                                          .-==-,                            
                                                                       =#########;                          
                                                                     -############                          
                                                                    ;############                           
                                                                    .#########X;         .,,,,.             
                               .;=xX##X+.                             -+xx+-      ,=x#############=         
                           -x#############                                    =######################.      
                       ;x##################      vj.autometrics         .=############################=     
                    -#######################                       ,+##########+-,          ,+#########-    
                 ,X#########################,                  ;x#######X=,                    -########    
               =#############################              -X######x-                           ,#######    
             x###############################          -x######=.                                X######    
          .X####+.       ;###################-     ,x#####X-      .#################-            ;######    
         X###x             ##################x .+#####X;         .################               ;#####x    
       x####               ,######################X;             ################+               +#####     
     .#####.                ##################x;                #################+               #####-     
     ######                 ##################                 #### #############=              x####x      
    +#######                ,#################+               x###, #############-             ;####x       
    ,########-              -##################              =####  #############;            .####x        
     -##########x=;;;--+#######################.            ,####   #############.           ,####+         
       =##################X; +#################+            ####x   #############           -####-          
          ,=xX######x=;      ,##################           #####   .#############          +####.           
                              ##################          #####=   .#############         ####x             
                              ##################=        x#####    .#############       -####;              
                              x##################       =#####;    ,#############      X###x                
                              ;##################      ;######     ;#############    -####.                 
                               ##################-    .######      -#############  .####=                   
                               ###################    ######x      -############+ x###x                     
                               -##################   #######       -################X                       
                                ##################, x######-       -###############                         
                                x#################+;######X        =############X                           
                                .#########################         =############                            
                                 x#######################,         =############                            
                                  ######################=         .X###########+                            
                                  -####################+        +##############                             
                                   =##################=      ;####+x##########x                             
                                    ,################,     +####;  +##########                              
                                      -x###########=    -####+     ##########.                              
                                         ,-+x##x=.    +####;       #########;                               
                                                   .####x         x########,                                
                                                 ,####-           ########                                  
                                                X###;            #######+                                   
                                               ####.            X######.                                    
                                              x####            ######,                                      
                                              #####          =####x.                                        
                                              X#####,     ;X####-                                           
                                               +#############-                                              
                                                 ;+X####+;       

INTEGRATED 12/12
    social login status (non-interation) (inspired by) http://www.seomoz.org/blog/visitor-social-network-login-status-google-analytics
    CV4 from cookie
    prevent form data
    pagename in clicks and forms 
    event validation (verify all strings, verify that only interactions send interactions)
    non-interaction events
    viewport detection
    scroll detect Time to scroll? Too soon? - http://cutroni.com/blog/2012/02/21/advanced-content-tracking-with-google-analytics-part-1/
    multiple tracker support - full session is mirrored to the secondary account, events are only sent to primary
    set user defined var
    abstracted config vars to caller
    Addthis/shareThis support (inspired by) http://support.addthis.com/customer/portal/articles/381260-google-analytics-integration#.UN-U75G9KSM
    doubleclick remarketing (dc.js) support
    
INTEGRATED 3/13
    conditionals around all console.logs (for IE) - enable console logging thru the _vj.debug param
    conditionals for addthis / sharethis; prevent errors when true, but not present in DOM
    
INTEGRATED 7/13
    support for uri fragments (anchors,hashtags,hashbangs etc)
    tracking chained domains (movement across allowed domains) as virtual pv /chained/
    
INTEGRATED 8/13
    updated support for fragments
    test for DNT and ABP (trackAdblock)
    
TO DO:
    climb up and find a link
    swap src on iframes that match allow domain
    prevent on iframes that match allow domain but don't match uid
    default value params events
    event to data layer
    ranktracker
        /*
        // credited to @ajkohn blindfiveyearold.com / ht @cutroni
        if (document.referrer.match(/google\.com/gi) && document.referrer.match(/cd/gi)) {
            var myString = document.referrer;
            var r        = myString.match(/cd=(.*?)&/);
            var rank     = parseInt(r[1]);
            var kw       = myString.match(/q=(.*?)&/);
            
            if (kw[1].length > 0) {
                var keyWord  = decodeURI(kw[1]);
            } else {
                keyWord = "(not provided)";
            }
        
            var p        = document.location.pathname;
            _gaq.push(['_trackEvent', 'ranktracker', keyWord, p, rank, true]);
        }
        * /

*/


/*
~*~*~*~*~*~*~*~*~*~*~*~*~*
This section handles config and init
~*~*~*~*~*~*~*~*~*~*~*~*~*/
try {
    var _vj = _vj || {};
    _vj = {
        allowDomain: _vj.autometrics.allowDomain || [],
        trackParams: _vj.autometrics.trackParams || [],
        primary: _vj.autometrics.primary || "UA-36024936-7",
        secondary: _vj.autometrics.secondary || false,
        useReferrer: _vj.autometrics.useReferrer || false,
        useFragment: _vj.autometrics.useFragment || false,
        customVars: _vj.autometrics.customVars || false,
        trackClicks: _vj.autometrics.trackClicks || false,
        trackForms: _vj.autometrics.trackForms || false,
        trackViewport: _vj.autometrics.trackViewport || false,
        trackScroll: _vj.autometrics.trackScroll || false,
        trackAdblock: _vj.autometrics.trackAdblock || false,
        trackSocial: _vj.autometrics.trackSocial || false,
        configSocial: _vj.autometrics.configSocial || {},
        useAddThis: _vj.autometrics.useAddThis || false,
        useShareThis: _vj.autometrics.useShareThis || false,
        useDoubleclick: _vj.autometrics.useDoubleclick || false,
        debug: _vj.autometrics.debug || false,
        arrhost: location.hostname.split(".")
    };
    _vj.utmhost = "." + _vj.arrhost[_vj.arrhost.length - 2] + "." + _vj.arrhost[_vj.arrhost.length - 1];
    _vj.pathname = (document.location.pathname + ((_vj.useFragment) ? document.location.hash : '')).toLowerCase();
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    This section sets up the baseline GATC
    ~*~*~*~*~*~*~*~*~*~*~*~*~*/
    
    try {
        if (typeof (_vj.runonce) === "undefined") {
            var thispg = (document.location.pathname + document.location.search + ((_vj.useFragment) ? document.location.hash : '')).toLowerCase();
            _gaq.push(["_setAccount", _vj.primary]
                      , ["_setDomainName", _vj.utmhost]
                      , ["_setAllowLinker", ((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)]
                      , ["_setAllowHash", !((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)]
                      , ["_trackPageview", thispg]);
            if (_vj.secondary !== false && _vj.secondary.length > 0) {
                _gaq.push(["b._setAccount", _vj.secondary]
                          , ["b._setDomainName", _vj.utmhost]
                          , ["b._setAllowLinker", ((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)]
                          , ["b._setAllowHash", !((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)]
                          , ["b._trackPageview", thispg]);
            }
        }
        _vj.runonce = true
    } catch (err) {
        if (_vj.debug) {
            console.log("err: " + err)
        }
    }
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    make cookies! YUM!  bakery functions credited to http://www.quirksmode.org/js/cookies.html, with minor and architectural mods.  I'm taking full credit for the name cookeez (you have to say it with a cookie monster accent).  Cool right?
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    */
    
    (function (window, undefined) {
        var cookeez = {
            bake: function (name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString()
                } else {
                    expires = ""
                }
                document.cookie = name + "=" + value + expires + ";domain=." + location.hostname + ";path=/"
            },
            eat: function (name) { //returns boolean set/not; add second arg to return value as a str
                var nameEQ = name + "=";
                var jar = document.cookie.split(";");
                var isSet = false;
                var strOut = "";
                for (var i = 0; i < jar.length; i++) {
                    var c = jar[i];
                    while (c.charAt(0) == " ") {
                        c = c.substring(1, c.length)
                    }
                    if (c.indexOf(nameEQ) == 0) {
                        strOut = c.substring(nameEQ.length, c.length);
                        isSet = true
                    }
                }
                return (arguments.length == 2) ? strOut : isSet
            },
            crumble: function (name) {
                bake(name, "", -1)
            }
        };
        window._vj.cookeez = cookeez //promote the fn
    }(window));
    
    // jQuery QS plugin
    (function ($) {
        $.querystring = (function (qstr) {
            if (qstr == "") {
                return {}
            }
            var result = {};
            for (var i = 0; i < qstr.length; ++i) {
                var key = qstr[i].split("=");
                result[key[0]] = decodeURIComponent(key[1].replace(/\+/g, " "))
            }
            return result
        })(window.location.search.substr(1).split("&"))
    })(jQuery);
    
    // event proxy function to catch from "forms and clicks"
    (function (window, undefined) {
        var _evTrackProxy = function (cat, action, label, el) {
            try {
                if (typeof (el) !== "undefined") {
                    label = "" + _vj.frmOrder + "";
                    _vj.frmOrder++
                }
                var isPassive = (arguments.length > 4 && arguments[4]) ? true : false;
                if (_vj.debug) {
                    console.log("'_trackEvent'," + cat + "," + action + "," + label + ", undefined, " + isPassive)
                } else {
                    _gaq.push(["_trackEvent", cat, action, label, undefined, isPassive])
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("evProxy: " + err)
                }
            }
        };
        window._evTrackProxy = _evTrackProxy //promote the fn - also exposed to flash, so please do not change fn name, and make sure this remains at window scope
    }(window));
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    detect hashchange events
    ~*~*~*~*~*~*~*~*~*~*~*~*~*/
    (function() {
        var locationHashChanged = function(){
            _vj.pathname = (document.location.pathname +  document.location.hash ).toLowerCase();
            _gaq.push(["_trackPageview", _vj.pathname]);
        };
        window.locationHashChanged = locationHashChanged;
    }(window));
    window.onhashchange = (_vj.useFragment) ? locationHashChanged : window.onhashchange;
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    set the user defined var
    ~*~*~*~*~*~*~*~*~*~*~*~*~*/
    try {
        if (_vj.useReferrer !== false && document.referrer.length > 0 && (_vj.cookeez.eat("_vj-utm-ud") === false)) {
            _gaq.push(["_setVar", document.referrer]);
        }
        _vj.cookeez.bake("_vj-utm-ud", "init", false);
    } catch (err) {
        if (_vj.debug) {
            console.log("err: " + err);
        }
    }
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    detect ad blocking scripts
    ~*~*~*~*~*~*~*~*~*~*~*~*~*/
    try {
        if (_vj.trackAdblock && (_vj.cookeez.eat("_vj-utm-abp") === false)) { //only perform on first run
            _vj.cookeez.bake("_vj-utm-abp", "init", false);
            _vj.ads = ((typeof(_adsok)!=='undefined' && _adsok===true)? 'ads visible':'ads blocked');
            _vj.dnt = ((window.navigator.doNotTrack) ? 'enabled' : 'not set');
            if (typeof (_vj.debug) !== "undefined" && _vj.debug === true) {
                console.log("'_trackEvent', 'environment', 'adblock', " + _vj.ads.toString() + ", undefined, true");
            } else {
                _gaq.push(["_trackEvent", "environment", "adblock", _vj.ads.toString(), undefined, true]);
                _gaq.push(["_trackEvent", "environment", "do not track", _vj.dnt.toString(), undefined, true]);
            }
        }
    } catch (err) {
        if (_vj.debug) {
            console.log("logAdblock: " + err);
        }
    }
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    x-domain linkage and event handlers by tonyfelice (c) vladimir jones GNU GPLv3
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    */
    jQuery(document).ready(function () {
        var thishost = location.hostname;
        var regex = /^http(s)?\:\/\//i;
        var fileregex = /^[^#\?]*\.(xml|rss|json|pdf|gif|jpg|png|txt|doc|docx|dmg|xls|xlsx|ppt|pptx|swf|wav|wma|mp3|mp4|mpg|mov|msi|exe|ics|vcf|zip|sit|rar|gz)($|[#\?])/i;
        _vj.frmOrder = 1;
        
         //link handler: x-domain, download, and outbound
        jQuery("a").each(function () {
            try {
                var tracker = false;
                var thishref = (jQuery(this).attr("href")) ? jQuery(this).attr("href") : "none";
                var linkflag = "";
                if (thishref != "none" && thishref.search(regex) > -1 && thishref.indexOf(thishost) == -1) {
                    if (typeof (_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 0) {
                        for (i = 0; i < _vj.allowDomain.length; i++) {
                            if (thishref.indexOf(_vj.allowDomain[i]) > -1) {
                                try {
                                    jQuery(this).click(function (event) {
                                        event.preventDefault();
                                        tracker = _gat._getTrackerByName();
                                        this.href = tracker._getLinkerUrl(this.href);
                                        _gaq.push(["_trackPageview", _vj.pathname + "/chained/" + thishref.replace(regex, "")]);
                                        //vj_chainwindow will allow the session to cross into iFrames and new tabs
                                        if (jQuery(this).hasClass("vj_chainwindow") || jQuery(this).attr("target") == "_blank" || jQuery(this).attr("rel") == "external") {
                                            window.open(this.href)
                                        } else {
                                            window.location = this.href
                                        }
                                    })
                                } catch (err) {
                                    if (_vj.debug) {
                                        console.log("link:" + err + "; " + this.href + " getLinkerURL fail")
                                    }
                                }
                                linkflag = thishref;
                            }
                        }
                    }
                    if (linkflag!=thishref) {
                        jQuery(this).click(function () {
                            _gaq.push(["_trackPageview", _vj.pathname + "/outbound/" + this.href.replace(regex, "")])
                        });
                    }
                } else {
                    if (thishref != "none" && thishref.search(fileregex) > -1) {
                        jQuery(this).click(function () {
                            _gaq.push(["_trackPageview", _vj.pathname + "/download/" + this.href.replace(regex, "")])
                        });
                    }
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("link:" + err + "; " + this.href + " not handled");
                }
            }
        });
        if (typeof (_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 0) {
            jQuery("form").each(function () {
                try {
                    var thisaction = (jQuery(this).attr("action")) ? jQuery(this).attr("action") : "none";
                    if (thisaction != "none" && thisaction.search(regex) > -1 && thisaction.indexOf(thishost) == -1) {
                        for (i = 0; i < _vj.allowDomain.length; i++) {
                            if (thisaction.indexOf(_vj.allowDomain[i]) > -1) {
                                jQuery(this).submit(function () {
                                    _gaq.push(["_linkByPost", this])
                                })
                            }
                        }
                    }
                } catch (err) {
                    if (_vj.debug) {
                        console.log("form:" + err + "; " + this + " linkByPost fail")
                    }
                }
            })
        }
    });
    jQuery(document).ready(function () {
        jQuery("input,select,textarea,button").each(function () {
            try {
                var __fld, __frm, __fid;
                //'vj_noevent' class can be set at the form or element levels, and will disable tracking
                if (!jQuery(this).hasClass("vj_noevent") && !jQuery(this).hasClass("vj_noevent") && _vj.trackForms) {
                    __fid = (jQuery(this).attr("id").length > 0) ? jQuery(this).attr("id") + ":" : jQuery(this).attr("name") + ":";
                    __fld = (this.id.length > 0) ? __fid + this.id : __fid + this.name;
                    __fld = _vj.pathname + ":" + __fld;
                    jQuery(this).blur(function () {
                        _evTrackProxy("forms", __fld.toString(), "", this)
                    })
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("flds:" + err + "; " + this + " inspection fail")
                }
            }
        });
        jQuery("*").click(function (e) {
            try {
                var target = [e.target.nodeName.toLowerCase()];
                var ePos = e.pageX + "," + e.pageY;
                var vtarget;
                target[1] = "";
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("id")) !== "undefined" && jQuery(e.target).attr("id").length > 0) ? "#" + jQuery(e.target).attr("id") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("class")) !== "undefined" && jQuery(e.target).attr("class").length > 0) ? "." + jQuery(e.target).attr("class") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("name")) !== "undefined" && jQuery(e.target).attr("name").length > 0) ? ":" + jQuery(e.target).attr("name") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("title")) !== "undefined" && jQuery(e.target).attr("title").length > 0) ? "-" + jQuery(e.target).attr("title") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("rel")) !== "undefined" && jQuery(e.target).attr("rel").length > 0) ? "=" + jQuery(e.target).attr("rel") : target[1];
                if (typeof (jQuery(e.target).attr("href")) != "undefined" && jQuery(e.target).attr("href").length > 0) {
                    target[2] = jQuery(e.target).attr("href");
                    tmp = target[2].split("?"); //this is disrespectful of a fragment
                    target[2] = " (href=" + tmp[0] + ")";
                }
                vtarget = target[1];
                target = target.toString().replace(/,/g, "");
                target = _vj.pathname + ":" + target;
                if (!jQuery(e.target).parents().andSelf().hasClass("vj_noclick") && _vj._thisClickEvent != ePos && (typeof (_vj.trackClicks) === "undefined" || _vj.trackClicks == true)) {
                    _evTrackProxy("clicks", target, e.pageX + "," + e.pageY);
                    _vj._thisClickEvent = ePos
                }
                //test for the presence of a virtual pageview request
		try {
                    if (jQuery(e.target).hasClass("vj_virtualpage") && _vj._thisClickVirtual != vtarget) {
                        _gaq.push(["_trackPageview", "/virtualpage/" + encodeURI(vtarget)]);
                        _vj._thisClickVirtual = vtarget
                    }
                } catch (err) {
                    if (_vj.debug) {
                        console.log("click:" + err + "; " + this + " virtual pv fail")
                    }
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("click: " + err)
                }
            }
        });
        try {
            _vj.paramsLogged = "";
            if (typeof (_vj.trackParams) !== "undefined" && _vj.trackParams.length > 0 && window.location.search.length > 0) {
                for (i = 0; i < _vj.trackParams.length; i++) {
                    if (typeof (jQuery.querystring[_vj.trackParams[i]]) !== "undefined" && _vj.paramsLogged.indexOf(_vj.trackParams[i]) < 0) {
                        _evTrackProxy("params", decodeURIComponent(_vj.trackParams[i]), jQuery.querystring[_vj.trackParams[i]], undefined, true);
                        _vj.paramsLogged += _vj.trackParams[i] + ","
                    }
                }
            }
        } catch (err) {
            if (_vj.debug) {
                console.log("param: " + err)
            }
        }
    });
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    Viewport detection by tonyfelice (c) vladimir jones GNU GPLv3
    
    fires event on initial load and resize events, as well as height/width flipflop indicating device reorientation
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    */
    
    //send to GA window viewport size on inital load and when resized as non-interactive events
    jQuery(function () {
        // init
        var win = {
            width: 0,
            height: 0,
            preW: 0,
            preH: 0,
            layout: 0,
            maxW: 0
        };

        //track viewport dimensions
	function logViewport(state, isPassive) {
            try {
                if (state === "resize" || _vj.cookeez.eat("_vj-utm-lw") === false) { //only perform on first run
                    win.width = jQuery(window).width();
                    win.height = jQuery(window).height();
                    win.layout = (win.width > win.height) ? "landscape" : "portrait";
                    if (state != "initial" && (win.height == win.preW && win.width == win.preH)) {
                        state = "flip"
                    }
                    if (typeof (_vj.debug) !== "undefined" && _vj.debug === true) {
                        console.log("'_trackEvent', 'viewport', " + state + "' layout', " + win.layout + ", undefined, " + isPassive);
                        console.log("'_trackEvent', 'viewport', " + state + "' width', " + win.width.toString() + ", undefined, " + isPassive);
                        console.log("'_trackEvent', 'viewport', " + state + "' height', " + win.height.toString() + ", undefined, " + isPassive)
                    } else {
                        _gaq.push(["_trackEvent", "viewport", state + " layout", win.layout, undefined, isPassive]);
                        _gaq.push(["_trackEvent", "viewport", state + " width", win.width.toString(), undefined, isPassive]);
                        _gaq.push(["_trackEvent", "viewport", state + " height", win.height.toString(), undefined, isPassive])
                    }
                    //reset the placeholder vars
		    win.preW = win.width;
                    win.preH = win.height;
                    _vj.cookeez.bake("_vj-utm-lv", "init", false)
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("logViewport: " + err)
                }
            }
        }

        function logWindow() {
            try {
                if (_vj.cookeez.eat("_vj-utm-lw") === false) { //only perform on first run  // not tracking height to keep events down - easy enough to pull from "screen resolution" after segmenting viewport width
                    win.maxW = window.screen.availWidth;
                    if (typeof (_vj.debug) !== "undefined" && _vj.debug === true) {
                        console.log("'_trackEvent', 'viewport', 'avail width', " + win.maxW.toString() + ", undefined, true")
                    } else {
                        _gaq.push(["_trackEvent", "viewport", "avail width", win.maxW.toString(), undefined, true])
                    }
                    _vj.cookeez.bake("_vj-utm-lw", "init", false)
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("logWindow: " + err)
                }
            }
        }
        if (_vj.trackViewport) {
            logViewport("initial", true);
            logWindow();
            
            //resize listener
	    var tmpTimer;
            jQuery(window).resize(function () {
                clearTimeout(tmpTimer);
                tmpTimer = setTimeout(function () {
                    logViewport("resize", false)
                }, 500); //note: this timer is dormant UNLESS there's a resize event in play
            })
        }
    });
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    Scroll detection
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    
    based on work by
    Justin Cutroni
    Nick Mihailovski
    Thomas Baekdal
    Avinash Kaushik
    Joost de Valk
    Eivind Savio
     
    http://cutroni.com/blog/2012/02/21/advanced-content-tracking-with-google-analytics-part-1/
    
    */
    
    
    jQuery(function () {
        
        // Default time delay before checking location
	var callBackTime = 100;
        
        // # px before tracking a reader
	var readerLocation = 150;
        
	// Set some flags for tracking & execution
	var timer = 0;
        var scroller = false;
        var endContent = false;
        var didComplete = false;
        var attention = false;
        
	// Set some time variables to calculate reading time
	var startTime = new Date();
        var beginning = startTime.getTime();
        var totalTime = 0;

        // Track the aticle load?
	//_gaq.push(['_trackEvent', 'scrolling', 'loaded', '', undefined, true]);
	
	//process the timer
	function doTime(a, b) {
            return (Math.round((a - b) / 100) / 10).toString() + " sec"
        }

        // Check the location and track user
	function scrollPosition() {
            try {
                bottom = jQuery(window).height() + jQuery(window).scrollTop();
                height = jQuery(document).height();
                // If user starts to scroll send an event
		if (bottom > readerLocation && !scroller) {
                    currentTime = new Date();
                    scrollStart = currentTime.getTime();
                    timeToScroll = doTime(scrollStart, beginning);
                    if (!_vj.debug) {
                        _gaq.push(["_trackEvent", "scrolling", "scroll started", timeToScroll, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'scroll started', " + timeToScroll + ", undefined, false ")
                    }
                    scroller = true
                }
                
                // use #vj_doScroll id on any object you want to detect
                if (jQuery("#vj_doScroll").length && bottom >= jQuery("#vj_doScroll").scrollTop() + jQuery("#vj_doScroll").innerHeight() && !endContent) {
                    currentTime = new Date();
                    contentScrollEnd = currentTime.getTime();
                    timeToContentEnd = doTime(contentScrollEnd, beginning);
                    if (!_vj.debug) {
                        _gaq.push(["_trackEvent", "scrolling", "ContentBottom", timeToContentEnd, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'ContentBottom', '', " + timeToContentEnd + ", undefined, false")
                    }
                    endContent = true;
                }
                
		
		// If user has hit the bottom of page send an event
		if (bottom >= height && !didComplete) {
                    currentTime = new Date();
                    end = currentTime.getTime();
                    totalTime = doTime(end, beginning);
                    if (!_vj.debug) {
                        if ((Math.round((end - beginning) / 100) / 10) < 15 && !attention) {
                            //_gaq.push(['_setCustomVar', 5, 'ReaderType', 'Scanner', 2]);
			    _gaq.push(["_trackEvent", "attention", _vj.pathname + " : scanner", totalTime, undefined, false])
                        } else if(!attention){
			    //_gaq.push(['_setCustomVar', 5, 'ReaderType', 'Reader', 2]);
			    _gaq.push(['_trackEvent', 'attention', _vj.pathname+' : reader', totalTime, undefined, false ]);
			}
			
                        _gaq.push(["_trackEvent", "scrolling", "page bottom", totalTime, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'page bottom', " + totalTime + ", undefined, false");
                        if (!attention) {
                            console.log("'_trackEvent', 'attention', " + _vj.pathname + "' : reader/scanner', " + totalTime + ", undefined, false")
                        }
                    }
                    attention = true;
                    didComplete = true;
                }
                
		// If user returns to top send an event
		if (jQuery(window).scrollTop() == 0 && scroller) {
                    currentTime = new Date();
                    end = currentTime.getTime();
                    timeToScroll = doTime(end, beginning);
                    if (!_vj.debug) {
                        _gaq.push(["_trackEvent", "scrolling", "back to top", timeToScroll, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'back to top', " + timeToScroll + ", undefined, false ")
                    }
                    scroller = true;
                    //possible that they were simply looking to see how long it was before reading, let's allow pagebottom to fire again.
                    didComplete = false;
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("scrollpos: " + err)
                }
            }
        }
        
	// Track the scrolling and track location
	if (_vj.trackScroll) {
            jQuery(window).scroll(function () {
                if (timer) {
                    clearTimeout(timer)
                }
                // Use a buffer so we don't call trackLocation too often.
		timer = setTimeout(scrollPosition, callBackTime)
            })
        }
    });
    
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    Social login detection by tonyfelice (c) vladimir jones GNU GPLv3
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    inspired by Tom Anthony http://www.seomoz.org/blog/visitor-social-network-login-status-google-analytics
    ur idea ftw, but my fn is tehottnez tom ;-)
    
    
    USAGE
    <script src="vj_ga_social.js"></script>
    <script>
	checkSocial({
	    facebook: 'exampleAppId1234567890'
	    ,callback: optionalFn
	});
    </script>
      
     */
    (function (window, undefined) {
        var beacon, dataHandler, loadScr = function (src) {
                //handler for loading scripts
                var doc = window.document,
                    tag = "script",
                    g = doc.createElement(tag),
                    s = doc.getElementsByTagName(tag)[0];
                g.src = src;
                s.parentNode.insertBefore(g, s)
            }, loadImg = function (src, name) {
                //handler for loading images
                var i = new Image();
                
                // deallocate i and children, so that it's available next pass, same as i.onerror=null;i=null; etc
                i.onload = function () {
                    dataHandler(name, true);
                    i = i.onload = i.onerror = null
                };
                i.onerror = function () {
                    dataHandler(name, false);
                    i = i.onload = i.onerror = null
                };
                i.src = src;
                
            }, logStatus = function (network, status) {
                if (status) {
                    window._gaq.push(["_trackEvent", "social networks", network, "logged in", undefined, true])
                }
            }, logStatusDebug = function (network, status) {
                console.log("'_trackEvent', 'social networks', " + network + ", 'logged in', undefined, true")
            }, beacons = {
                //define and configure which networks are supported.  beacon (object) whose only child is src trigger handiling via image. beacon with src and init children are handled as script
		/*
		 * facebook has a supported API method to check login status without interaction.
		 * Pass the beaconName ("facebook") as an array key when calling the testSocial function.
		 * The value of the array key should be the appId from fb.
		 *
		 * NOTE: the first two chars of a beacon may be passed to custom vars in the future, please ensure they are unique
		 * 
		 */
                facebook: {
                    src: "//connect.facebook.net/en_US/all.js",
                    init: function (name) {
                        window.fbAsyncInit = function () {
                            FB.init({
                                appId: String(beacons.facebook.appId),
                                status: true,
                                cookie: true,
                                xfbml: true
                            });
                            FB.getLoginStatus(function (response) {
                                dataHandler(name, response.status !== "unknown"); //The status of the User. One of: connected, not_authorized or unknown.
                            }, true)
                        }
                    }
                },
                // the rest of these networks don't have supported methods, so we're requesting post-login images and triggering onload / onerror accordingly
		twitter: {
                    src: "https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif"
                },
                google: {
                    src: "https://accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png"
                },
                gplus: {
                    src: "https://plus.google.com/up/?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png&type=st&gpsrc=ogpy0"
                },
                pinterest: {
                    src: "https://pinterest.com/login/?next=https://s-passets-ec.pinimg.com/images/load2.gif"
                }
            },
            //define the main routine using any objects passed to function
            checkSocial = function (opts) {
                dataHandler = (_vj.debug) ? logStatusDebug : logStatus;
                if (opts.facebook) {
                    beacons.facebook.appId = opts.facebook
                }
                //override native logStatus handler with custom callback
                if (opts.callback) {
                    dataHandler = opts.callback
                }
                inits()
            }, inits = function () {//do the work
                //determine whether or not to run (only want to fire on session start)     
                if (_vj.cookeez.eat("_vj-utm-sd") == false) {
                    //loop the beacons json and handle accordingly
                    for (var name in beacons) {
                        beacon = beacons[name];
                        if (beacon.appId) { //fb is defined, but will not fire unless appId is handed to the fn when called by window
                            loadScr(beacon.src);
                            beacon.init(name)
                        } else {
                            // !beacon.init is an important test to determine which handler we really need
                            if (beacon.src && !beacon.init) {
                                loadImg(beacon.src, name)
                            }
                        }
                    }
                    //bake a cookie so we know we logged
                    _vj.cookeez.bake("_vj-utm-sd", "init", false)
                }
            };
        window._vj.checkSocial = checkSocial
    }(window));
    if (_vj.trackSocial) {
        setTimeout(function () {
            _vj.checkSocial(_vj.configSocial)
        }, 3000); // add slight delay to avoid overflowing the event buffer (10 events onload, replenish at 1 per sec https://developers.google.com/analytics/devguides/collection/other/limits-quotas)
    }
    
    
    /*
    ~*~*~*~*~*~*~*~*~*~*~*~*~*
    cvTools by tonyfelice (c) vladimir jones GNU GPLv3: This section configures 4 of the 5 available Custom Variables.
    
    Originally inspired by Will Critchlow (http://attributiontrackingga.googlecode.com); released under GPLv3;
    initially modified 10/10/10 tfelice
    12/31/12 [tf]	incorporated new CV4 format (using ^ delim)
		    rather than only setting on new visits, setting when CV4 does not match cookie ID
		    Pulling utma ID (was using posix)
		    externalized/promoted cky lib
		    packaged and sandboxed
    
    Because GA is typically a last-touch attribution tool, the first two custom variables are used to store the referrer and landing  page associated with a user's first visit.
    The third custom variable stores historical conversion information, and the fourth variable stores a unique identifier for each visitor.
    These custom variables will exist for the user until cookies are cleared.  Because the slots are limited, and the storage expectation is for the lifetime of the cookie,
    I've iterated them below, along with a mnemonic in parentheses. 
    1.	("From")   stores the first touch referrer 
    2.	("To")   stores the first touch landing page
    3.	("Free" or "E" as in e-comm)   aggregates historical conversion information in 5 parts:
	 a.	Total number of conversions for the visitor
	 b.	Total aggregate value of all historical conversions
	 c.	Milliseconds elapsed between the current conversion event and the previous 
	 d.	Time of the current conversion event (posix format)
	 e.	Time of the first conversion (posix format)
    4.	("For")   stores a unique identifier for each visitor. In no way personally identifiable, this is the user identifier assigned by Google in the __utma cookie, but otherwise unavailable to GA reporting
    
    
    */
    (function (window, undefined) {
        var cvTools = {
            getCky: {},  // extension hook; this lib needs cookie getter, but doesn't include it, needs to be extended with a bakery/cookie lib ex: _vj.cvTools.getCky = _vj.cookeez.eat;
	    crop: function(str) { // cv str size limit is 64, ensure that we're not passing something too long
	        var out, sz = 63;
                if (encodeURIComponent(str).substr(sz - 2, 1) == "%") {
                    out = decodeURIComponent(encodeURIComponent(str).substr(0, sz - 2))
                } else {
                    if (encodeURIComponent(str).substr(sz - 1, 1) == "%") {
                        out = decodeURIComponent(encodeURIComponent(str).substr(0, sz - 1))
                    } else {
                        out = decodeURIComponent(encodeURIComponent(str).substr(0, sz))
                    }
                }
                return out
            },
            getCV: function (slot) {
                try {
                    var cky = "__utmv",
                        // make sure you extend with a bakery when you init
                        val = this.getCky(cky, 1), 
                        out = false;
                    if (val.length === 0) {
                        return out
                    } else {
                        val = val.split("|");
                        val = val[1].split("^");
                        for (j = 0; j < val.length; j++) {
                            if (val[j].charAt(0) == slot) {
                                out = val[j].split("=")
                            }
                        }
                        return out
                    }
                } catch (err) {
                    if (_vj.debug) {
                        console.log("error:getCV; val:" + typeof (val) + "; " + err);
                    }
                    return false
                }
            },
            setCV: function (gaScope) {
                try {
                    var id = this.getId(),
                        cv = this.getCV(4);
                    if (id != false && (cv == false || cv[2] != id)) {
                        if (_vj.debug) {
                            console.log("'_setCustomVar', 1, 'r', " + document.referrer + ", 1");
                            console.log("'_setCustomVar', 2, 'l', " + this.crop(_vj.pathname) + ", 1");
                            console.log("'_setCustomVar', 4, 'v', " + id + ", 1")
                        } else {
                            gaScope.push(["_setCustomVar", 1, "r", (document.referrer.length > 0) ? this.crop(document.referrer.substr(7, document.referrer.length)) : "(direct)", 1]);
                            gaScope.push(["_setCustomVar", 2, "l", this.crop(_vj.pathname), 1]);
                            gaScope.push(["_setCustomVar", 4, "v", id, 1])
                        }
                    }
                } catch (err) {
                    if (_vj.debug) {
                        console.log("err: " + err)
                    }
                }
            },
            getId: function () {
                var cky = "__utma",
                    // make sure you extend with a bakery when you init
                    out = this.getCky(cky, 1);
                if (out.length === 0) {
                    return false
                } else {
                    out = out.split(".");
                    return out[1]
                }
            },
            setGoal: function (gaScope, nom, val) {
                try { //fire event 'auto-goal'; set CV3 with: count.total.sincelast.timenow.timefirst
                    var cv = this.getCV(3),
                    dt = new Date().getTime();
                    val = Math.round(val); //round to dollars, looking for the big picture here, and full string is dot delim so decimal in values would conflict.
                    if (cv.length > -1 && cv[1] == "g") {
                        cv = cv[2].split(".");
                        cv[0]++;
                        cv[1] = eval(val) + eval(cv[1]);
                        cv[2] = dt - cv[3];
                        if (_vj.debug) {
                            console.log("'_setCustomVar', 3, 'g', " + cv[0] + " +'.'+ " + cv[1] + " +'.'+ " + cv[2] + " +'.'+ " + dt + " +'.'+ " + cv[4] + ", 1")
                        } else {
                            gaScope.push(["_setCustomVar", 3, "g", cv[0] + "." + cv[1] + "." + cv[2] + "." + dt + "." + cv[4], 1])
                        }
                    }
                    if (!cv) { //first set
                        if (_vj.debug) {
                            console.log("'_setCustomVar', 3, 'g', 1 +'.'+ " + val + " +'.'+ 0 +'.'+ " + dt + " +'.'+ " + dt + ", 1")
                        } else {
                            gaScope.push(["_setCustomVar", 3, "g", 1 + "." + val + "." + 0 + "." + dt + "." + dt, 1])
                        }
                    }
                    cv = getCV(4);
                    if (_vj.debug) {
                        console.log("'_trackEvent', 'auto-goal'," + nom + ", " + cv.toString() + ", " + val.toString())
                    } else {
                        gaScope.push(["_trackEvent", "auto-goal", nom, cv.toString(), val.toString()])
                    }
                } catch (err) {
                    if (_vj.debug) {
                        console.log("err: " + err)
                    }
                }
            }
        };
        window._vj.cvTools = cvTools; //promote the fn
    }(window));
    jQuery(document).ready(function () {
        if (_vj.customVars) {
            _vj.cvTools.getCky = _vj.cookeez.eat;
            _vj.cvTools.setCV(_gaq)
        }
    });
    if (_vj.customVars) {
        _vj.cvTools.getCky = _vj.cookeez.eat;
        setTimeout(function () {
            _vj.cvTools.setCV(_gaq)
        }, 2000); // give a little time for the cookies to bake
    }
    
    /*~*~*~*~*~*~*~*~*~*~*~*~*
     * configure shareThis/AddThis
     * ~*~*~*~*~*~*~*~*~*~*~*/
    if (_vj.useAddThis) {
        try {
            var addthis_config = {
                data_ga_property: _vj.primary,
                data_ga_social: true
            }
        } catch (err) {
            if (_vj.debug) {
                console.log("err: " + err)
            }
        }
    }
    if (_vj.useShareThis) {
        try {
            stLight.options({
                publisherGA: _vj.primary,
                tracking: "true"
            })
        } catch (err) {
            if (_vj.debug) {
                console.log("err: " + err)
            }
        }
    }
} catch (err) {
    console.log("catastrophic: " + err)
};