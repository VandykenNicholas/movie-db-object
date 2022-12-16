let movieContainer =[];
let selectedIndex = undefined;
//// movie catcher
function getMovies(){
	movieContainer = [];
	fetch(`https://puffy-thoracic-peanut.glitch.me/movies`)
		.then((response) => response.json())
		.then((data)=> {
			let index = 0;
			$("#movieContainer").empty();
			data.forEach(function(m){
				movieContainer.push(new Movie(m.id, m.title, m.genre, m.rating, index))
				$("#movieContainer").append(`
					<div class="col clickMe" ">
						<div class="card" style="width: 18rem;">
							  <img src="" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">${m.title}</h5>
							    <p class="card-text">Plot</p>
							  </div>
							  <ul class="list-group list-group-flush">
							    <li class="list-group-item">${m.genre}</li>
							    <li class="list-group-item">${m.rating}</li>
							    <li class="list-group-item">A third item</li>
							  </ul>
							  <div class="card-body">
							    <button class="btn btn-primary delete" type="button" id="${index}">Delete</button>
							    <a href="#" class="card-link">Another link</a>
                              </div>
						</div>
					</div>`)
				index ++;
			})
			
		})
		.then(()=> console.log(movieContainer))
		.then(()=> updateEvents())
}

////// listeners

$('#addServer').click(function(){
	let title = $("#title").val()
	let rating = $("#rating").val()
	let genre = $('#genre').val()
	let movie = new Movie("N/A", title, rating, genre, "n/a");
	movie.add();
})

////////

function updateEvents(){
	
	$('.delete').click(function(){
		selectedIndex = parseInt($(this).attr("id"));
		
		
		movieContainer[selectedIndex].delete();
	})
}


getMovies();
