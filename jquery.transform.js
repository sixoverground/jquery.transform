/*!
 * jQuery Transform v0.1a
 * jQuery plugin for hardware accelerated animation on iOS and Android
 * http://github.com/sixoverground/jquery.transform
 *
 * Created by Craig Phares
 * Copyright (c) 2012 Six Overground
 * Released under the MIT license
 * http://sixoverground.com
 */
(function( $ ){
	
	var Transform = {
		
		animationIndex : 0,
		
		init : function( options ) {
			
			// Set default options.
			var settings = $.extend( {
								
				// transition settings
				duration: '400ms',
				easing: 'ease',
				delay: '0ms',
				//origin: ['50%', '50%'],
				
				queue: true
												
			}, options);

			return this.each(function(){
        
				var $this = $(this);
								
				// Calculate transform property.
				if (settings.translate === undefined && (settings.x !== undefined || settings.y !== undefined)) {
					settings.translate = ['0px', '0px'];
					if (settings.x !== undefined) settings.translate[0] = settings.x;
					if (settings.y !== undefined) settings.translate[1] = settings.y;					
				}
				
				// Calculate scale property.
				if (settings.scale !== undefined && typeof settings.scale !== 'object') {
					settings.scale = [settings.scale, settings.scale];
				}
				if (settings.scale === undefined && (settings.scaleX !== undefined || settings.scaleY !== undefined)) {
					settings.scale = [1, 1];
					if (settings.scaleX !== undefined) settings.scale[0] = settings.scaleX;
					if (settings.scaleY !== undefined) settings.scale[1] = settings.scaleY;					
				}

				// Calculate skew property.
				if (settings.skew === undefined && (settings.skewX !== undefined || settings.skewY !== undefined)) {
					settings.skew = ['0deg', '0deg'];
					if (settings.skewX !== undefined) settings.skew[0] = settings.skewX;
					if (settings.skewY !== undefined) settings.skew[1] = settings.skewY;					
				}
				
				// Determine original properties
				var origins = {};
				
				// Setup original translate
				if (settings.translate !== undefined) {
					origins.translate = ['0px', '0px'];
					if ($this.data('x') !== undefined) origins.translate[0] = $this.data('x');
					if ($this.data('y') !== undefined) origins.translate[1] = $this.data('y');
					$this.data('x', settings.translate[0]);
					$this.data('y', settings.translate[1]);				
				}

				// Setup original rotate
				if (settings.rotate !== undefined) {
					origins.rotate = '0deg';
					if ($this.data('rotate') !== undefined) origins.rotate = $this.data('rotate');
					$this.data('rotate', settings.rotate);
				}

				// Setup original scale
				if (settings.scale !== undefined) {
					origins.scale = [1, 1];
					if ($this.data('scaleX') !== undefined) origins.scale[0] = $this.data('scaleX');
					if ($this.data('scaleY') !== undefined) origins.scale[1] = $this.data('scaleY');
					$this.data('scaleX', settings.scale[0]);
					$this.data('scaleY', settings.scale[1]);				
				}

				// Setup original skew
				if (settings.skew !== undefined) {
					origins.skew = [1, 1];
					if ($this.data('skewX') !== undefined) origins.skew[0] = $this.data('skewX');
					if ($this.data('skewY') !== undefined) origins.skew[1] = $this.data('skewY');
					$this.data('skewX', settings.skew[0]);
					$this.data('skewY', settings.skew[1]);				
				}

				// Setup original opacity
				if (settings.opacity !== undefined) {
					origins.opacity = 1;
					if ($this.data('opacity') !== undefined) origins.opacity = $this.data('opacity');
					$this.data('opacity', settings.opacity);
				}
				
				// Create the animation keyframes style.
				var animationName = 'animation' + Transform.animationIndex++;
				var style = '@-webkit-keyframes ' + animationName + ' { ';
				var transformStyle = '';
				
				var transforms = '';
				if (origins.translate !== undefined) transforms += ' translate(' + origins.translate[0] + ', ' + origins.translate[1] + ')';
				if (origins.rotate !== undefined) transforms += ' rotate(' + origins.rotate + ')';
				if (origins.scale !== undefined) transforms += ' scale(' + origins.scale[0] + ', ' + origins.scale[1] + ')';
				if (origins.skew !== undefined) transforms += ' translate(' + origins.skew[0] + ', ' + origins.skew[1] + ')';
				
				// from
				style += '0% { ';
				style += '-webkit-transform:' + transforms + ';';							
				if ($this.css('opacity') !== undefined) style += 'opacity: ' + $this.css('opacity') + '; ';		
				style += '} '; // end from
			
				// to
				style += '100% { ';				
				style += '-webkit-transform:';
				if (settings.translate !== undefined) transformStyle += ' translate(' + settings.translate[0] + ', ' + settings.translate[1] + ')';
				if (settings.rotate !== undefined) transformStyle += ' rotate(' + settings.rotate + ')';
				if (settings.scale !== undefined) transformStyle += ' scale(' + settings.scale[0] + ', ' + settings.scale[1] + ')';
				if (settings.skew !== undefined) transformStyle += ' skew(' + settings.skew[0] + ', ' + settings.skew[1] + ')';
				style += transformStyle;
				style += '; '				
				if (settings.opacity !== undefined) style += 'opacity: ' + settings.opacity + '; ';				
				style += '} '; // end to
				
				style += '} '; // end keyframes
				
				// add styleClass
				var styleClass = '.' + animationName + ' { ';
				if (settings.origin !== undefined) styleClass += '-webkit-transform-origin: ' + settings.origin[0] + ' ' + settings.origin[1] + '; ';
				styleClass += '-webkit-animation-name: ' + animationName + '; ';
				styleClass += '-webkit-animation-duration: ' + settings.duration + '; ';
				styleClass += '-webkit-animation-timing-function: ' + settings.easing + '; ';
				styleClass += '-webkit-animation-delay: ' + settings.delay + '; ';
				styleClass += '-webkit-animation-fill-mode: forwards; ';
				styleClass += '} ';				
									
				// Add the animation keyframes to a stylesheet.
				var stylesheet = Transform.getStylesheet();
				
				if ($this.data('animation') !== undefined) {
					Transform.removeStyle(stylesheet, $this.data('animation'));
					$this.removeClass($this.data('animation'));
					$this.data('animation', '');
				}				
				
				stylesheet.insertRule(styleClass, 0);
				stylesheet.insertRule(style, 0);	
								
				// Setup the transformation origin.				
				if (settings.origin !== undefined) $this.css('-webkit-transform-origin', settings.origin[0] + ' ' + settings.origin[1]);
					
				$this.data('animation', animationName);
				$this.addClass(animationName);
				
				// check for immediate completion				
				if (parseInt(settings.delay, 10) + parseInt(settings.duration, 10) === 0) {										
					Transform.removeAnimation(stylesheet, animationName);
					if (settings.queue) {
						if (settings.complete !== undefined) settings.complete.apply(this);
					}
					
				} else {
					// Handle the animation completion event.
					$this.one('webkitAnimationEnd', function(){						
						Transform.removeAnimation(stylesheet, animationName);						
						if (settings.queue) {
							if (settings.complete !== undefined) settings.complete.apply(this);
						}							
					});							
				}
				
				
			});
			
		},
				
		// Find the last stylesheet, or create a new stylesheet.
		getStylesheet : function() {
			if (!document.styleSheets.length) {
				var style = document.createElement('style');
				document.getElementsByTagName('head')[0].appendChild(style);
				if (!window.createPopup) {
					style.appendChild(document.createTextNode(''));
				}
			}
			return document.styleSheets[document.styleSheets.length - 1];
		},

		// Remove an animation from a stylesheet.
		removeAnimation : function(stylesheet, animationName) {
    	for (var j = stylesheet.cssRules.length - 1; j >= 0; j--) {
     		var rule = stylesheet.cssRules[j];
     		if (rule.type === 7 && rule.name == animationName) {
     			stylesheet.deleteRule(j);
       		return;
     		}
    	}	    			
  	},

		removeStyle : function(stylesheet, className) {
    	for (var j = stylesheet.cssRules.length - 1; j >= 0; j--) {
     		var rule = stylesheet.cssRules[j];
     		if (rule.type === 1 && rule.selectorText == '.' + className) {
     			stylesheet.deleteRule(j);
     			return;
     		}
    	}				
		}
	
		
	};

	$.fn.transform = function( method ) {
		
		return Transform.init.apply( this, arguments );
		  
	};

})( jQuery );