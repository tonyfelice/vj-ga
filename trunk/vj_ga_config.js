	try{			
		_vj.arrhost = location.hostname.split('.');
		_vj.utmhost = '.' + _vj.arrhost[_vj.arrhost.length-2] + '.' + _vj.arrhost[_vj.arrhost.length-1];
		_gaq.push(
			['_setDomainName', _vj.utmhost]
			,['_setAllowLinker', ((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
			,['_setAllowHash', !((_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 1)]
		);
	} catch(err) {}