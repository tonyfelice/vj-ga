	try{			
		_vj.arrhost = location.hostname.split('.');
		_vj.utmhost = '.' + _vj.arrhost[_vj.arrhost.length-2] + '.' + _vj.arrhost[_vj.arrhost.length-1];
		_gaq.push(
			['_setAccount', _vj.primary]
			,['_setDomainName', _vj.utmhost]
			,['_setAllowLinker', ((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
			,['_setAllowHash', !((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
		);
		if(typeof(_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 0){
			_gaq.push(
				['b._setAccount', _vj.secondary]
				,['b._setDomainName', _vj.utmhost]
				,['b._setAllowLinker', ((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
				,['b._setAllowHash', !((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
				,['b.trackPageview']
			);
			_gaq.push(['b.trackPageview']);
		}
	} catch(err) {}