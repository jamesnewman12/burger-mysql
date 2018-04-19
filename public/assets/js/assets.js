$(function() {
	$('.ate-bgr').on('click', function(event) {
		let id = $(this).data('id');
		let newDevourState = {
			devoured: 1
		};

		$.ajax('/api/burgers/' + id, {
			type: 'PUT',
			data: newDevourState
		}).then(
			function() {
				location.reload();
			}
		);
	})	

	$('.add-burger').on('submit', function(event) {
		event.preventDefault();
		if($('#new-burger').val().length === 0) {
			alert('Add your favorite burger chain!');
	} else {
		let newBurger = {
			burger_name: "'" + $('#new-burger').val().trim() + "'",
			devoured: 0  
			}
		console.log(newBurger);
		$.ajax('/api/burgers', {
			type: 'POST',
			data: newBurger
		}).then(
			function(){
				console.log('added chain');
				location.reload();
			})
		}
	})
})