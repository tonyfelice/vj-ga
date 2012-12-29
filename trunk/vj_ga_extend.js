	jQuery(document).ready(function(){
		var thishost = location.hostname;
		var regex = /^http(s)?\:\/\//i;
		var fileregex = /\.(xml|rss|json|gif|jpg|png|pdf|txt|doc|docx|dmg|xls|xlsx|ppt|pptx|swf|wav|wma|mp3|mp4|mpg|mov|msi|exe|ics|vcf|zip|sit|rar|gz)($|[#\?])/i;
		jQuery('a').each(function(){
			try{
				//
				//
				//
				// need iframe support
				// linkbyPost get support
				//
				//			
			
				var tracker = false; 		
				var thishref = (jQuery(this).attr('href')) ? jQuery(this).attr('href') : 'none';
				var linkflag = false;
				if(thishref != 'none' && thishref.search(regex)>-1 && thishref.indexOf(thishost)==-1){
					if(typeof(_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 0){
						for(i=0; i<_vj._allowDomain.length; i++){
							if(thishref.indexOf(_vj._allowDomain[i])>-1){								
								try{
									jQuery(this).click(function(event){
										event.preventDefault();
										tracker = _gaq._getAsyncTracker();	
										this.href = tracker._getLinkerUrl(this.href);
										if (jQuery(this).hasClass('gae_chainwindow') || jQuery(this).attr('target')=='_blank' || jQuery(this).attr('rel')=='external'){  //gae_chainwindow will allow the session to cross into iFrames and new tabs
											window.open(this.href);
										}else{
											window.location = this.href;	
										}										
									});									
								}catch(err){
									//console.debug('link:' + err + '; ' + this.href + ' getLinkerURL fail');
								}								
								linkflag = true;
							}
						}
					}
					if(!linkflag){
						jQuery(this).click(function(){
							_gaq.push(['_trackPageview', '/outbound/'+this.href.replace(regex, '')]); 
						});
					}	
				}else if(thishref != 'none' && thishref.search(fileregex)>-1 && ((thishref.search(regex)>-1 && thishref.indexOf(thishost)>-1) || (thishref.search(regex)==-1))){
					jQuery(this).click(function(){
						_gaq.push(['_trackPageview', '/download/'+this.href.replace(regex, '')]); 
					});
				}
			} catch(err) {
				//console.debug('link:' + err + '; ' + this.href + ' not handled');
			}
		});			
		if(typeof(_vj._allowDomain) !== 'undefined' && _vj._allowDomain.length > 0){
			jQuery('form').each(function(){
				try{				
					var thisaction = (jQuery(this).attr('action')) ? jQuery(this).attr('action') : 'none';
					if(thisaction != 'none' && thisaction.search(regex)>-1 && thisaction.indexOf(thishost)==-1){
						for(i=0; i<_vj._allowDomain.length; i++){
							if(thisaction.indexOf(_vj._allowDomain[i])>-1){
								jQuery(this).submit(function(){
									_gaq.push(['_linkByPost', this]);
								});
							}
						}							
					}
				} catch(err) {
					//console.debug('form:' + err + '; ' + this + ' linkByPost fail');
				}
			});
		}
	});
	jQuery(document).ready(function(){
		jQuery('input,select,textarea,button').each(function(){
			try{
				var __frm = jQuery(this).parent('form');
				if(!jQuery(this).hasClass('gae_noevent')  && !__frm.hasClass('gae_noevent')){ //'gae_noevent' class can be set at the form or element levels, and will disable tracking
					__frm = (__frm.attr('id').length > 0) ? __frm.attr('id')+':' : __frm.attr('name')+':';
					jQuery(this).blur(function(){
						_evTrackProxy('forms', (this.id.length > 0) ? __frm + this.id : __frm + this.name, '', this);
					});						
				}
			} catch(err) {
				//console.debug('flds:' + err + '; ' + this + ' inspection fail');
			}						
		});		
		jQuery("*").click(function(e){
			try{
				var target = [e.target.nodeName.toLowerCase()];
				var ePos = e.pageX+','+e.pageY;
				target[1] = '';
				target[1] = (target[1] == '' && typeof(jQuery(e.target).attr('id')) !== 'undefined' && jQuery(e.target).attr('id').length > 0) ?  '#' + jQuery(e.target).attr('id') : target[1];
				target[1] = (target[1] == '' && typeof(jQuery(e.target).attr('class')) !== 'undefined' && jQuery(e.target).attr('class').length > 0) ?  '.' + jQuery(e.target).attr('class') : target[1];
				target[1] = (target[1] == '' && typeof(jQuery(e.target).attr('name')) !== 'undefined' && jQuery(e.target).attr('name').length > 0) ?  ':' + jQuery(e.target).attr('name') : target[1];
				target[1] = (target[1] == '' && typeof(jQuery(e.target).attr('title')) !== 'undefined' && jQuery(e.target).attr('title').length > 0) ?  '-' + jQuery(e.target).attr('title') : target[1];
				target[1] = (target[1] == '' && typeof(jQuery(e.target).attr('rel')) !== 'undefined' && jQuery(e.target).attr('rel').length > 0) ?  '=' + jQuery(e.target).attr('rel') : target[1];
				if(typeof(jQuery(e.target).attr('href')) != 'undefined' && jQuery(e.target).attr('href').length > 0){
					target[2] = ' (href=' + jQuery(e.target).attr('href') + ')';
				}
				target = target.toString().replace(/,/g,'');					
				if(!jQuery(e.target).parents().andSelf().hasClass('gae_noclick') && _vj._thisClickEvent != ePos && (typeof(_vj._logClickEvent) === 'undefined' || _vj._logClickEvent == true)){/* look up the chain for .gae_noclick, and only track if false*/
					_evTrackProxy('clicks', target, e.pageX+','+e.pageY);
					_vj._thisClickEvent = ePos;
				}
				//test for the presence of a virtual pageview request
				try{
					if(jQuery(e.target).hasClass('gae_virtualpage') && _vj._thisClickVirtual != target){
						_gaq.push(['_trackPageview', '/virtualpage/' + encodeURI(target) ]);
						_vj._thisClickVirtual = target;
					}
				} catch(err) {
					//console.debug('click:' + err + '; ' + this + ' virtual pv fail');
				}	
			} catch(err) {
				//console.debug('click:' + err);
			}	
		});
		try{
			_vj.paramsLogged = '';			
			if(typeof(_vj._trackParameters) !== 'undefined' && _vj._trackParameters.length > 0 && window.location.search.length > 0){
				for(i=0; i<_vj._trackParameters.length; i++){
					if(typeof(jQuery.querystring[_vj._trackParameters[i]]) !== 'undefined' && _vj.paramsLogged.indexOf(_vj._trackParameters[i])<0 ){								
						_evTrackProxy('params', _vj._trackParameters[i], jQuery.querystring[_vj._trackParameters[i]]);
						_vj.paramsLogged += _vj._trackParameters[i] + ',';
					}
				}
			}
		}catch(err){
			//console.debug('param:' + err);
		}
	});
	function _evTrackProxy(cat, action, label, el){
		var tmp = '';
		var regex = '';
		var window.order = 1;
		try{
			if(typeof(el) !== 'undefined'){
				label = window.order;
				window.order++;
				/*
				 * storing field data
				 *
				//handle sel pos
				if(typeof(el.selectedIndex) !== 'undefined'){ 
					label = el.options[el.selectedIndex].text;
				//handle cbo state
				}else if( jQuery(el).attr('type') == 'checkbox' ||  jQuery(el).attr('type') == 'radio' ){ 
					tmp = el.value.replace(/[\W\s]+/g,'_');
					label = (el.checked) ? tmp + ':checked' : tmp + ':unchecked';
				//obfuscate pwd
				}else if( jQuery(el).attr('type') == 'password' ){  
					label = el.value.replace(/[a-z]/g,'x').replace(/[A-Z]/g,'X').replace(/[0-9]/g,'9').replace(/[^xX9]/g,'$');
				//obfuscate email
				}else{ 
					regex = /^([a-zA-Z0-9._%+-]+)(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
					if(regex.test(el.value)){
						tmp = regex.exec(el.value);
						label = 'xxxxx' + tmp[2];
					}else{
						label = el.value;
					}
				}*/
			}
			_gaq.push(['_trackEvent', cat, action, label]);
		} catch(err) {
			//console.debug('eventProxy:' + err);
		}
	}
	(function($) {
	    $.querystring = (function(qstr) {
	        if (qstr == "") return {};
	        var result = {};
	        for (var i = 0; i < qstr.length; ++i){
	            var key=qstr[i].split('=');
	            result[key[0]] = decodeURIComponent(key[1].replace(/\+/g, " "));
	        }
	        return result;
	    })(window.location.search.substr(1).split('&'))
	})(jQuery);
