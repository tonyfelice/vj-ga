 (c) 2012 vladimirjones.com - released under GNU GPLv3 http://www.gnu.org/licenses/gpl.html - this project is hosted at http://vj-ga.googlecode.com
______________________________________________________________________________________________________________________________________________________________________________________________________________/
_____________________________________________________________________________________________________________________________________________________________________________________________________________/_
______/\/\____/\/\__________/\/\____________/\/\____________________/\/\__________________/\/\______/\/\________________/\/\__________________/\/\__________________________________________________________/__
_____/\/\____/\/\__________/\/\__________/\/\/\/\____/\/\__/\/\__/\/\/\/\/\____/\/\/\____/\/\/\__/\/\/\____/\/\/\____/\/\/\/\/\__/\/\__/\/\____________/\/\/\/\____________________________________________/___
____/\/\____/\/\__________/\/\________/\/\____/\/\__/\/\__/\/\____/\/\______/\/\__/\/\__/\/\/\/\/\/\/\__/\/\/\/\/\____/\/\______/\/\/\/\____/\/\____/\/\__________________________________________________/____
_____/\/\/\/\____/\/\____/\/\__/\/\__/\/\/\/\/\/\__/\/\__/\/\____/\/\______/\/\__/\/\__/\/\__/\__/\/\__/\/\__________/\/\______/\/\________/\/\____/\/\__________________________________________________/_____
______/\/\________/\/\/\/\____/\/\__/\/\____/\/\____/\/\/\/\____/\/\/\______/\/\/\____/\/\______/\/\____/\/\/\/\____/\/\/\____/\/\________/\/\/\____/\/\/\/\____________________________________________/______
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
	* Logs pageviews to otherwise non-trackable resources such as PDF files, such as /downloads/report.pdf
	* Tracks all form interactions, to perform robust abandonment analysis (can be disabled at a field or form level by applying a CSS class: .gae_noevent)
	* Tracks all clicks, including the intended target of the click and the x,y position of the mouse (can be disabled at an element or parent level by applying a CSS class: .gae_noclick)

GA can do all of these things, it just typically requires lots of inline code edits (outside of the typical GATC block)

In addition to streamlining the installation workflow, this code configures 4 of the 5 available Custom Variables.  Because GA is typically a last-touch attribution tool, the first two custom variables are used to store the referrer and landing  page associated with a user’s first visit.  The third custom variable stores historical conversion information, and the fourth variable stores a unique identifier for each visitor.  These custom variables will exist for the user until cookies are cleared.  Because the slots are limited, and the storage expectation is for the lifetime of the cookie, I’ve iterated them below, along with a mnemonic in parentheses. 
1.	("From")   stores the first touch referrer (aka the referring site that first brought the visitor to the site)
2.	("To")   stores the first touch landing page
3.	("Free" or "E" as in e-comm)   aggregates historical conversion information in 5 parts:
     a.	Total number of conversions for the visitor
     b.	Total aggregate value of all historical conversions
     c.	Milliseconds elapsed between the current conversion event and the previous (just happened to be the easiest metric :)
     d.	Time of the current conversion event (posix format)
     e.	Time of the first conversion (posix format)
4.	("For")   stores a unique identifier for each visitor. In no way personally identifiable, this is the user identifier assigned by Google in the __utmz cookie, but otherwise unavailable to GA reporting


////////////////////////////////////////////////////////////////
////	FILE STRUCTURE
////////////////////////////////////////////////////////////////
vj_ga_config.js
configures GATC: setDomainName, setAllowLinker, setAllowHash

vj_ga_custom.js
configures custom variables, contains a custom function for tracking eComm: _goal()

vj_ga_extend.js
handles cross-domain tracking, form events, and click positions

vj_ga_min.js
contains the previous 3 files, packaged in that order (config,custom,extend), using the YUI compressor 2.4.4

vj_ga_social.js
OPTIONAL - detects whether or not visitors are logged into certain social networks (currently google,googleplus,twitter,facebook,pinterest), and logs such status as an analytics event, under the category 'social'



////////////////////////////////////////////////////////////////
////	CSS CLASSES
////////////////////////////////////////////////////////////////
class		usage
gae_noclick	valid anywhere class is valid, will prevent clicks on that object and all of it's children
gae_noevent	will block tracking at the form or field levels (inherited when set at form)
gae_virtualpage valid anywhere class is valid, will register a click as a virtual pageview, using the element as the resource
gae_chainwindow	faciliates the transfer of session information to external windows



////////////////////////////////////////////////////////////////
////	TRACKING CONFIGURATION - GATC
////////////////////////////////////////////////////////////////
variable		enforcement	type		usage					notes
_vj._allowDomain	required	scalar (arr)	defines domains that will be tracked	comma-delim array of domains, as strings
_vj._trackParameters	optional	scalar (arr)	defines querystring params to track	params are logged as events when detected
_vj._logClickEvent	optional	boolean		global click event toggle		can be used to globally disable click tracking




