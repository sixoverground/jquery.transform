$(function(){
	
	// Add ghost boxes.
	// ----------------

	$('.box').each(function(index, element){
		$(this).before('<div class="ghost"/>');
	});
	
	// Translate
	// =========
	
	$('#translate-x button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			x: '90px',
			complete: function() {
				$(this).transform({
					x: '0px'
				});
			}
		});
	});

	$('#translate-y button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			y: '30px',
			complete: function() {
				$(this).transform({
					y: '0px'
				});
			}
		});
	});

	$('#translate button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			translate: ['200px', '20px'],
			complete: function() {
				$(this).transform({
					translate: ['0px', '0px']
				});
			}
		});
	});

	// Rotate
	// ======
	
	$('#rotate button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			rotate: '30deg',
			complete: function() {
				$(this).transform({
					rotate: '0deg'
				});
			}
		});
	});

	// Scale
	// =====
	
	$('#scale button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			scale: 1.2,
			complete: function() {
				$(this).transform({
					scale: 1
				});
			}
		});
	});

	$('#scale-x button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			scaleX: 2,
			complete: function() {
				$(this).transform({
					scaleX: 1
				});
			}
		});
	});

	$('#scale-y button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			scaleY: 1.5,
			complete: function() {
				$(this).transform({
					scaleY: 1
				});
			}
		});
	});

	$('#scale-both button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			scale: [2, 1.5],
			complete: function() {
				$(this).transform({
					scale: [1, 1]
				});
			}
		});
	});

	// Skew
	// ====
	
	$('#skew-x button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			skewX: '30deg',
			complete: function() {
				$(this).transform({
					skewX: '0deg'
				});
			}
		});
	});

	$('#skew-y button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			skewY: '30deg',
			complete: function() {
				$(this).transform({
					skewY: '0deg'
				});
			}
		});
	});

	$('#skew button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			skew: ['30deg', '-30deg'],
			complete: function() {
				$(this).transform({
					skew: ['0deg', '0deg']
				});
			}
		});
	});

	// Opacity
	// =======
	
	$('#opacity button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			opacity: 0,
			complete: function() {
				$(this).transform({
					opacity: 1
				});
			}
		});
	});
	
});

