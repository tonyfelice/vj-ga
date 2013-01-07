 vj.autometrics (c) 2012 vladimirjones.com - released under GNU GPLv3 http://www.gnu.org/licenses/gpl.html - this project is hosted at http://vj-ga.googlecode.com
______________________________________________________________________________________________________________________________________________________________________________________________________________/
_____________________________________________________________________________________________________________________________________________________________________________________________________________/_
______/\/\____/\/\__________/\/\____________/\/\____________________/\/\__________________/\/\______/\/\________________/\/\__________________/\/\__________________________________________________________/__
_____/\/\____/\/\__________/\/\__________/\/\/\/\____/\/\__/\/\__/\/\/\/\/\____/\/\/\____/\/\/\__/\/\/\____/\/\/\____/\/\/\/\/\__/\/\__/\/\____________/\/\/\/\_____/\/\/\/\_______________________________/___
____/\/\____/\/\__________/\/\________/\/\____/\/\__/\/\__/\/\____/\/\______/\/\__/\/\__/\/\/\/\/\/\/\__/\/\/\/\/\____/\/\______/\/\/\/\____/\/\____/\/\_________/\/\/\/\_________________________________/____
_____/\/\/\/\____/\/\____/\/\__/\/\__/\/\/\/\/\/\__/\/\__/\/\____/\/\______/\/\__/\/\__/\/\__/\__/\/\__/\/\__________/\/\______/\/\________/\/\____/\/\_______________/\/\_______________________________/_____
______/\/\________/\/\/\/\____/\/\__/\/\____/\/\____/\/\/\/\____/\/\/\______/\/\/\____/\/\______/\/\____/\/\/\/\____/\/\/\____/\/\________/\/\/\____/\/\/\/\___/\/\/\/\_________________________________/______
_______________________________________________________________________________________________________________________________________________________________________________________________________/_______
______________________________________________________________________________________________________________________________________________________________________________________________________/________


The following is a library intended to extend the functionality of Google Analytics.
This project is hosted at Google Code, which enables us to serve the source files directly from Google, as well as centrally manage the code.  
In testing, all the tracking code has loaded onto the pages and transmitted data to analytics in an average of 400ms. 

There are sample tracking codes for transactional as well as informational sites.  
The basic tracking block is here: http://code.google.com/p/vj-ga/source/browse/trunk/vj_client_basic.txt 
The tracking block would be placed at the bottom of every page to be tracked, essentially the same placement as the default tracking code, and is designed to be compatible with Google Tag Manager (GTM)

This tracking library solves for a couple of tricky issues in a robust analytics implementation.
	* Auto-detects and configures cross-domain tracking (code must still be installed on each page per site)
	* Dynamically configures cross-domain form submissions to maintain session (technically, the _linkByPost() function)
	* Dynamically configures external links to transmit cookie/session information, provided that the external link is part of the cross-domain set (technically, the _link() function)
		* Otherwise, clicks to outbound links are sent to analytics as /outbound/twitter.com
	* Provides the ability to add a secondary tracker, to perform roll-up reporting. Full session is mirrored to the secondary account, events are only sent to primary.
	* Logs pageviews to otherwise non-trackable resources such as PDF files, such as /downloads/report.pdf
	* Provides for ad-hoc virtual pageviews if necessary
	* Enables the setting of the "user defined" slot in GA
	* Provides for the storage of explicitly defined querystring parameters as events
	* Tracks all form field interactions, and the order in which they were blurred.  This can be used to perform robust abandonment analysis (can be disabled at a field or form level by applying a CSS class: .vj_noevent)
	* Tracks all clicks, including the intended target of the click and the x,y position of the mouse (can be disabled at an element or parent level by applying a CSS class: .vj_noclick)
	* Tracks robust viewport information, including the initial actual size of the window, any resize events, the orientation (portrait / landscape), and the available width as an individual value (much more valuable than the full dimensions as a singel string)
	* Tracks scroll position, seeing that it's particularly useful for content strategy/promotion to understand whether a single-page visitor came and read an entire article
	* Has the ability to detect a small set of social networks that the visitor is currently logged into
	* Provides an easy method to configure social action tracking through ShareThis/AddThis (plugins must be installed as they normally would)

GA can record all of these things, but it would normall require lots of inline code edits (outside of the typical GATC block)

In addition to streamlining the installation workflow, this code configures 4 of the 5 available Custom Variables.
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


////////////////////////////////////////////////////////////////
////	FILE STRUCTURE
////////////////////////////////////////////////////////////////
vj_ga_config.js - deprecated
configures GATC: setDomainName, setAllowLinker, setAllowHash

vj_ga_custom.js - deprecated
configures custom variables, contains a custom function for tracking eComm: _goal()

vj_ga_extend.js - deprecated
handles cross-domain tracking, form events, and click positions

vj_ga.min.js
contains the previous 3 files, packaged in that order (config,custom,extend)
minified using the YUI compressor 2.4.4

vj_ga_social.js
OPTIONAL - detects whether or not visitors are logged into certain social networks (currently google,googleplus,twitter,facebook,pinterest), and logs such status as an analytics event, under the category 'social'



////////////////////////////////////////////////////////////////
////	CSS SELECTORS
////////////////////////////////////////////////////////////////
selector	usage
vj_noclick	valid anywhere class is valid, will prevent clicks on that object and all of it's children
vj_noevent	will block tracking at the form or field levels (inherited when set at form)
vj_virtualpage	valid anywhere class is valid, will register a click as a virtual pageview, using the element as the resource
vj_chainwindow	faciliates the transfer of session information to external windows
vj_doScroll	potentially fires an event when visitor scrolls to the bottom of the element



////////////////////////////////////////////////////////////////
////	TRACKING CONFIGURATION - GATC
////////////////////////////////////////////////////////////////
variable			enforcement	type		usage					notes
_vj.autometrics.allowDomain	required	scalar (arr)	defines domains that will be tracked	comma-delim array of domains, as strings
_vj.autometrics.primary		required	string		defines primary UA account id		example: 'UA-36024936-5'
_vj.autometrics.secondary	optional	string		defines secondary UA account id		(example: 'UA-36024936-6') secondary account DOES NOT get events - used for roll-up or migration
_vj.autometrics.trackParameters	optional	scalar (arr)	defines querystring params to track	params are logged as events when detected
_vj.autometrics.trackClicks	optional	boolean		global click event toggle		can be used to globally disable click tracking
_vj.autometrics.trackForms	optional	boolean		global form event toggle		can be used to globally disable form field tracking
_vj.autometrics.trackViewport	optional	boolean		global viewport event toggle		can be used to globally disable viewport tracking
_vj.autometrics.trackScroll	optional	boolean		global scroll event toggle		can be used to globally disable scroll tracking
_vj.autometrics.trackSocial	optional	boolean		global social login detection		can be used to globally disable social login detection
_vj.autometrics.useShareThis	optional	boolean		set ShareThis social action hooks	does not install the plugin, simply configures
_vj.autometrics.useAddThis	optional	boolean		set AddThis social action hooks		does not install the plugin, simply configures
_vj.autometrics.useDoubleclick	optional	boolean		loads dc.js instead of ga.js		does not install the plugin, simply configures
_vj.autometrics.userDefined	optional	string		set value of 'user defined' slot	can pass a string, or any expression that evaluates to one
_vj.autometrics.customVars	optional	boolean		disable custom variable tracking	can be used to globally disable first touch referrer storage
_vj.autometrics.debug		optional	boolean		disable events/CVs and log to console	still fires trackPageview and performs any x-domain handling



