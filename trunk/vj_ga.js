
try {
    var _vj = _vj || {};
    _vj = {
        allowDomain: _vj.autometrics.allowDomain || [],
        trackParams: _vj.autometrics.trackParams || [],
        primary: _vj.autometrics.primary || "UA-36024936-7",
        secondary: _vj.autometrics.secondary || false,
        useReferrer: _vj.autometrics.useReferrer || false,
        customVars: _vj.autometrics.customVars || false,
        trackClicks: _vj.autometrics.trackClicks || false,
        trackForms: _vj.autometrics.trackForms || false,
        trackViewport: _vj.autometrics.trackViewport || false,
        trackScroll: _vj.autometrics.trackScroll || false,
        trackSocial: _vj.autometrics.trackSocial || false,
        configSocial: _vj.autometrics.configSocial || {},
        useAddThis: _vj.autometrics.useAddThis || false,
        useShareThis: _vj.autometrics.useShareThis || false,
        useDoubleclick: _vj.autometrics.useDoubleclick || false,
        debug: _vj.autometrics.debug || false,
        arrhost: location.hostname.split(".")
    };
    _vj.utmhost = "." + _vj.arrhost[_vj.arrhost.length - 2] + "." + _vj.arrhost[_vj.arrhost.length - 1];
    try {
        if (typeof (_vj.runonce) === "undefined") {
            _gaq.push(["_setAccount", _vj.primary], ["_setDomainName", _vj.utmhost], ["_setAllowLinker", ((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)], ["_setAllowHash", !((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)], ["_trackPageview"]);
            if (_vj.secondary !== false && _vj.secondary.length > 0) {
                _gaq.push(["b._setAccount", _vj.secondary], ["b._setDomainName", _vj.utmhost], ["b._setAllowLinker", ((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)], ["b._setAllowHash", !((_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 1)], ["b._trackPageview"])
            }
        }
        _vj.runonce = true
    } catch (err) {
        if (_vj.debug) {
            console.log("err: " + err)
        }
    }(function (window, undefined) {
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
            eat: function (name) {
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
        window._vj.cookeez = cookeez
    }(window));
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
        window._evTrackProxy = _evTrackProxy
    }(window));
    try {
        if (_vj.useReferrer !== false && document.referrer.length > 0 && (_vj.cookeez.eat("_vj-utm-ud") === false)) {
            _gaq.push(["_setVar", document.referrer])
        }
        _vj.cookeez.bake("_vj-utm-ud", "init", false)
    } catch (err) {
        if (_vj.debug) {
            console.log("err: " + err)
        }
    }
    jQuery(document).ready(function () {
        var thishost = location.hostname;
        var regex = /^http(s)?\:\/\//i;
        var fileregex = /^[^#\?]*\.(xml|rss|json|pdf|gif|jpg|png|txt|doc|docx|dmg|xls|xlsx|ppt|pptx|swf|wav|wma|mp3|mp4|mpg|mov|msi|exe|ics|vcf|zip|sit|rar|gz)($|[#\?])/i;
        _vj.frmOrder = 1;
        jQuery("a").each(function () {
            try {
                var tracker = false;
                var thishref = (jQuery(this).attr("href")) ? jQuery(this).attr("href") : "none";
                var linkflag = false;
                if (thishref != "none" && thishref.search(regex) > -1 && thishref.indexOf(thishost) == -1) {
                    if (typeof (_vj.allowDomain) !== "undefined" && _vj.allowDomain.length > 0) {
                        for (i = 0; i < _vj.allowDomain.length; i++) {
                            if (thishref.indexOf(_vj.allowDomain[i]) > -1) {
                                try {
                                    jQuery(this).click(function (event) {
                                        event.preventDefault();
                                        tracker = _gat._getTrackerByName();
                                        this.href = tracker._getLinkerUrl(this.href);
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
                                linkflag = true
                            }
                        }
                    }
                    if (!linkflag) {
                        jQuery(this).click(function () {
                            _gaq.push(["_trackPageview", "/outbound/" + this.href.replace(regex, "")])
                        })
                    }
                } else {
                    if (thishref != "none" && thishref.search(fileregex) > -1) {
                        jQuery(this).click(function () {
                            _gaq.push(["_trackPageview", "/download/" + this.href.replace(regex, "")])
                        })
                    }
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("link:" + err + "; " + this.href + " not handled")
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
                if (!jQuery(this).hasClass("vj_noevent") && !jQuery(this).hasClass("vj_noevent") && _vj.trackForms) {
                    __fid = (jQuery(this).attr("id").length > 0) ? jQuery(this).attr("id") + ":" : jQuery(this).attr("name") + ":";
                    __fld = (this.id.length > 0) ? __fid + this.id : __fid + this.name;
                    __fld = location.pathname + ":" + __fld;
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
                target[1] = "";
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("id")) !== "undefined" && jQuery(e.target).attr("id").length > 0) ? "#" + jQuery(e.target).attr("id") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("class")) !== "undefined" && jQuery(e.target).attr("class").length > 0) ? "." + jQuery(e.target).attr("class") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("name")) !== "undefined" && jQuery(e.target).attr("name").length > 0) ? ":" + jQuery(e.target).attr("name") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("title")) !== "undefined" && jQuery(e.target).attr("title").length > 0) ? "-" + jQuery(e.target).attr("title") : target[1];
                target[1] = (target[1] == "" && typeof (jQuery(e.target).attr("rel")) !== "undefined" && jQuery(e.target).attr("rel").length > 0) ? "=" + jQuery(e.target).attr("rel") : target[1];
                if (typeof (jQuery(e.target).attr("href")) != "undefined" && jQuery(e.target).attr("href").length > 0) {
                    target[2] = jQuery(e.target).attr("href");
                    tmp = target[2].split("?");
                    target[2] = " (href=" + tmp[0] + ")"
                }
                target = target.toString().replace(/,/g, "");
                target = location.pathname + ":" + target;
                if (!jQuery(e.target).parents().andSelf().hasClass("vj_noclick") && _vj._thisClickEvent != ePos && (typeof (_vj.trackClicks) === "undefined" || _vj.trackClicks == true)) {
                    _evTrackProxy("clicks", target, e.pageX + "," + e.pageY);
                    _vj._thisClickEvent = ePos
                }
                try {
                    if (jQuery(e.target).hasClass("vj_virtualpage") && _vj._thisClickVirtual != target) {
                        _gaq.push(["_trackPageview", "/virtualpage/" + encodeURI(target)]);
                        _vj._thisClickVirtual = target
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
    jQuery(function () {
        var win = {
            width: 0,
            height: 0,
            preW: 0,
            preH: 0,
            layout: 0,
            maxW: 0
        };

        function logViewport(state, isPassive) {
            try {
                if (state === "resize" || _vj.cookeez.eat("_vj-utm-lw") === false) {
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
                if (_vj.cookeez.eat("_vj-utm-lw") === false) {
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
            var tmpTimer;
            jQuery(window).resize(function () {
                clearTimeout(tmpTimer);
                tmpTimer = setTimeout(function () {
                    logViewport("resize", false)
                }, 500)
            })
        }
    });
    jQuery(function () {
        var callBackTime = 100;
        var readerLocation = 150;
        var timer = 0;
        var scroller = false;
        var endContent = false;
        var didComplete = false;
        var attention = false;
        var startTime = new Date();
        var beginning = startTime.getTime();
        var totalTime = 0;

        function doTime(a, b) {
            return (Math.round((a - b) / 100) / 10).toString() + " sec"
        }

        function scrollPosition() {
            try {
                bottom = jQuery(window).height() + jQuery(window).scrollTop();
                height = jQuery(document).height();
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
                if (jQuery("#vj_doScroll").length && bottom >= jQuery("#vj_doScroll").scrollTop() + jQuery("#vj_doScroll").innerHeight() && !endContent) {
                    currentTime = new Date();
                    contentScrollEnd = currentTime.getTime();
                    timeToContentEnd = doTime(contentScrollEnd, beginning);
                    if (!_vj.debug) {
                        _gaq.push(["_trackEvent", "scrolling", "ContentBottom", timeToContentEnd, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'ContentBottom', '', " + timeToContentEnd + ", undefined, false")
                    }
                    endContent = true
                }
                if (bottom >= height && !didComplete) {
                    currentTime = new Date();
                    end = currentTime.getTime();
                    totalTime = doTime(end, beginning);
                    if (!_vj.debug) {
                        if ((Math.round((end - beginning) / 100) / 10) < 15 && !attention) {
                            _gaq.push(["_trackEvent", "attention", location.pathname + " : scanner", totalTime, undefined, false])
                        } else {
                            if (!attention) {
                                _gaq.push(["_trackEvent", "attention", location.pathname + " : reader", totalTime, undefined, false])
                            }
                        }
                        _gaq.push(["_trackEvent", "scrolling", "page bottom", totalTime, undefined, false])
                    } else {
                        console.log("'_trackEvent', 'scrolling', 'page bottom', " + totalTime + ", undefined, false");
                        if (!attention) {
                            console.log("'_trackEvent', 'attention', " + location.pathname + "' : reader/scanner', " + totalTime + ", undefined, false")
                        }
                    }
                    attention = true;
                    didComplete = true
                }
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
                    didComplete = false
                }
            } catch (err) {
                if (_vj.debug) {
                    console.log("scrollpos: " + err)
                }
            }
        }
        if (_vj.trackScroll) {
            jQuery(window).scroll(function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(scrollPosition, callBackTime)
            })
        }
    });
    (function (window, undefined) {
        var beacon, dataHandler, loadScr = function (src) {
                var doc = window.document,
                    tag = "script",
                    g = doc.createElement(tag),
                    s = doc.getElementsByTagName(tag)[0];
                g.src = src;
                s.parentNode.insertBefore(g, s)
            }, loadImg = function (src, name) {
                var i = new Image();
                i.onload = function () {
                    dataHandler(name, true);
                    i = i.onload = i.onerror = null
                };
                i.onerror = function () {
                    dataHandler(name, false);
                    i = i.onload = i.onerror = null
                };
                i.src = src
            }, logStatus = function (network, status) {
                if (status) {
                    window._gaq.push(["_trackEvent", "social networks", network, "logged in", undefined, true])
                }
            }, logStatusDebug = function (network, status) {
                console.log("'_trackEvent', 'social networks', " + network + ", 'logged in', undefined, true")
            }, beacons = {
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
                                dataHandler(name, response.status !== "unknown")
                            }, true)
                        }
                    }
                },
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
            }, checkSocial = function (opts) {
                dataHandler = (_vj.debug) ? logStatusDebug : logStatus;
                if (opts.facebook) {
                    beacons.facebook.appId = opts.facebook
                }
                if (opts.callback) {
                    dataHandler = opts.callback
                }
                inits()
            }, inits = function () {
                if (_vj.cookeez.eat("_vj-utm-sd") == false) {
                    for (var name in beacons) {
                        beacon = beacons[name];
                        if (beacon.appId) {
                            loadScr(beacon.src);
                            beacon.init(name)
                        } else {
                            if (beacon.src && !beacon.init) {
                                loadImg(beacon.src, name)
                            }
                        }
                    }
                    _vj.cookeez.bake("_vj-utm-sd", "init", false)
                }
            };
        window._vj.checkSocial = checkSocial
    }(window));
    if (_vj.trackSocial) {
        setTimeout(function () {
            _vj.checkSocial(_vj.configSocial)
        }, 3000)
    }(function (window, undefined) {
        var cvTools = {
            getCky: {},
            crop: function (str) {
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
                            console.log("'_setCustomVar', 2, 'l', " + this.crop(window.location.pathname) + ", 1");
                            console.log("'_setCustomVar', 4, 'v', " + id + ", 1")
                        } else {
                            gaScope.push(["_setCustomVar", 1, "r", (document.referrer.length > 0) ? this.crop(document.referrer.substr(7, document.referrer.length)) : "(direct)", 1]);
                            gaScope.push(["_setCustomVar", 2, "l", this.crop(window.location.pathname), 1]);
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
                    out = this.getCky(cky, 1);
                if (out.length === 0) {
                    return false
                } else {
                    out = out.split(".");
                    return out[1]
                }
            },
            setGoal: function (gaScope, nom, val) {
                try {
                    var cv = this.getCV(3),
                        dt = new Date().getTime();
                    val = Math.round(val);
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
                    if (!cv) {
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
        window._vj.cvTools = cvTools
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
        }, 2000)
    }
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