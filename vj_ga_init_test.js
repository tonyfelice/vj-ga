var _vj = {
	autometrics: {
		allowDomain:	[	//required
			'vladimirjones.com'
			,'autometrics.tumblr.com'
		]
		,primary:	'UA-36024936-5'	//required
		,secondary:	false  
		,trackClicks:	true
		,trackForms:	true
		,trackViewport:	true
		,trackScroll:	true
		,trackSocial:	true
		,configSocial:	{
			facebook:'400138846746903'}
		,useReferrer:	true
		,customVars:	true
		,debug:		false
		,useAddThis:	false
		,useShareThis:	false
		,useDoubleclick:true
		,trackParams:	[ 
			'distance[postal_code]'
			,'distance%5Bpostal_code%5D'
		]
	}
};
var _gaq = _gaq || [];