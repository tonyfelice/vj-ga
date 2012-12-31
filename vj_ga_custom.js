// inspired by Will Critchlow (http://attributiontrackingga.googlecode.com); released under GPLv3; modified 10/10/10 tfelice
function _test(cky) {
	var boo = 0;
	var dat = '';
	var jar = document.cookie.split(';');
	cky = cky+"=";
	for (var i=0;i<jar.length;i++){
		while (jar[i].charAt(0)==' ') jar[i] = jar[i].substring(1,jar[i].length);
		if (jar[i].indexOf(cky) == 0){
			boo = 1;
			dat = jar[i].substring(cky.length, jar[i].length);
		}
	}
	return (arguments.length == 2) ? dat : boo;
}
function _crop(s) {
	var sz = 63;
	if (encodeURIComponent(s).substr(sz-2,1) == "%"){
		out = decodeURIComponent(encodeURIComponent(s).substr(0,sz-2));
	} else if (encodeURIComponent(s).substr(sz-1,1) == "%"){
		out = decodeURIComponent(encodeURIComponent(s).substr(0,sz-1));
	} else {
		out = decodeURIComponent(encodeURIComponent(s).substr(0,sz));
	}
	return out;
}
function _getCV(i){
	var cky = '__utmv';
	var ret = _test(cky,1);
	var tmp = false;
	if (_test(cky) === 0){return tmp;}else{
		ret = ret.split('|');
		ret = ret[1].split(',');
		for(j=0; j<ret.length; j++){
			if(ret[j].charAt(0) == i){
				tmp = ret[j].split('=');
			}
		}
		return tmp;		
	}
}
function _getId(){
	var cky = '__utma';
	var ret = _test(cky,1);
	if (_test(cky) === 0){
		return false;
	}else{
		ret = ret.split('.');
		return ret[1];		
	}
}
function _setCV(o){
	try {
		var id = _getId();
		if (_test('__utma') === 0){				 		
			o.push(['_setCustomVar', 1, 'r', (document.referrer.length > 0)?_crop(document.referrer.substr(7,document.referrer.length)):'(direct)', 1]);
			o.push(['_setCustomVar', 2, 'l', _crop(window.location.pathname), 1]);
			o.push(['_setCustomVar', 4, 'v', id, 1]);
		}
		console.log('cv4=' + _getCV(4));
	} catch (err) {
		console.log(err);
	}
}
function _goal(gaq,nom,val){//count.total.sincelast.timenow.timefirst
	try {
		var cv = _getCV(3);
		var dt = new Date().getTime();
		val = Math.round(val);
		if(cv.length > -1 && cv[1] =='g'){
			cv = cv[2].split('.');
			cv[0]++;
			cv[1]=eval(val)+eval(cv[1]);
			cv[2] = dt - cv[3];
			gaq.push(['_setCustomVar', 3, 'g', cv[0] +'.'+ cv[1] +'.'+ cv[2] +'.'+ dt +'.'+ cv[4], 1]);
		}
		if(!cv){
			gaq.push(['_setCustomVar', 3, 'g', 1 +'.'+ val +'.'+ 0 +'.'+ dt +'.'+ dt, 1]);	
		}
		cv = _getCV(4);
		gaq.push(['_trackEvent', 'auto-goal', nom, cv, val]);
	} catch (err) {}
}
_setCV(_gaq);























