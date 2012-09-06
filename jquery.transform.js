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
				duration: '0s',
				easing: 'ease',
				delay: '0s',
				origin: ['50%', '50%'],
												
			}, options);

			return this.each(function(){
        
				var $this = $(this);
				
				var queue = true;
				
				// Calculate transform property.
				if (!settings.translate && (settings.x || settings.y)) {
					settings.translate = ['0px', '0px'];
					if (settings.x) settings.translate[0] = settings.x;
					if (settings.y) settings.translate[1] = settings.y;					
				}
				
				// Calculate scale property.
				if (settings.scale && typeof settings.scale !== 'object') {
					settings.scale = [settings.scale, settings.scale];
				}
				if (!settings.scale && (settings.scaleX || settings.scaleY)) {
					settings.scale = [1, 1];
					if (settings.scaleX) settings.scale[0] = settings.scaleX;
					if (settings.scaleY) settings.scale[1] = settings.scaleY;					
				}

				// Calculate skew property.
				if (!settings.skew && (settings.skewX || settings.skewY)) {
					settings.skew = ['0deg', '0deg'];
					if (settings.skewX) settings.skew[0] = settings.skewX;
					if (settings.skewY) settings.skew[1] = settings.skewY;					
				}
																	
				// Create the animation keyframes style.
				var animationName = 'animation' + Transform.animationIndex++;
				var style = '@-webkit-keyframes ' + animationName + ' { ';
				
				// from
				style += '0% {';
				style += '-webkit-transform: ' + $this.css('-webkit-transform') + ';';				
				style += 'opacity: ' + $this.css('opacity') + ';';				
				style += '}'; // end from
			
				// to
				style += '100% {';				
				style += '-webkit-transform:';
				if (settings.translate) style += ' translate(' + settings.translate[0] + ', ' + settings.translate[1] + ')';
				if (settings.rotate) style += ' rotate(' + settings.rotate + ')';
				if (settings.scale) style += ' scale(' + settings.scale[0] + ', ' + settings.scale[1] + ')';
				if (settings.skew) style += ' skew(' + settings.skew[0] + ', ' + settings.skew[1] + ')';
				style += ';'				
				if (settings.opacity) style += 'opacity: ' + settings.opacity + ';';				
				style += '}'; // end to
				
				style += '}'; // end keyframes
					
				// Add the animation keyframes to a stylesheet.
				var stylesheet = Transform.getStylesheet();
				stylesheet.insertRule(style, 0);	
				
				// Setup the transformation origin.				
				$this.css('-webkit-transform-origin', settings.origin[0] + ' ' + settings.origin[1]);

				// Set the animation on the element.
				$this.css('-webkit-animation-name', animationName);
				$this.css('-webkit-animation-duration', settings.duration);
				$this.css('-webkit-animation-timing-function', settings.easing);
				$this.css('-webkit-animation-delay', settings.delay);
				$this.css('-webkit-animation-fill-mode', 'forwards');
				
				// Handle the animation completion event.
				$this.one('webkitAnimationEnd', function(){
					Transform.removeAnimation(stylesheet, animationName);
					if (settings.complete) settings.complete.apply(this);
				});				
				
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
	      	stylesheet.deleteRule(j)
	        return;
	      }
	    }				
		}
		
	};

	$.fn.transform = function( method ) {
		
		return Transform.init.apply( this, arguments );
		  
	};

})( jQuery );