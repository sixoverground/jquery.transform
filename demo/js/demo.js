$(function(){
	
	$('#translate-x button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			x: '90px',
			duration: '1s',
			complete: function() {
				$(this).transform({
					x: '0px',
					duration: '1s'
				});
			}
		});
	});

	$('#translate-y button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			y: '30px',
			duration: '1s',
			complete: function() {
				$(this).transform({
					y: '0px',
					duration: '1s'
				});
			}
		});
	});

	$('#translate button').click(function(e){				
		$(this).parents('article').find('.box').transform({
			translate: ['200px', '20px'],
			duration: '1s',
			complete: function() {
				$(this).transform({
					translate: ['0px', '0px'],
					duration: '1s'
				});
			}
		});
	});
	
	
});

