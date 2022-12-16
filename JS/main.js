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
							    <h5 class="card-title title">${m.title}</h5>
							    <p class="card-text plot">Plot</p>
							  </div>
							  <ul class="list-group list-group-flush">
							    <li class="list-group-item genre">${m.genre}</li>
							    <li class="list-group-item rating">${m.rating}</li>
							    <li class="list-group-item">A third item</li>
							  </ul>
							  <div class="card-body">
							    <button class="btn btn-danger delete" type="button" id="${index}">Delete</button>
							    <button class="btn btn-primary edit" type="button" id="">Edit</button>
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
	$("#title").val('')
	$("#rating").val('')
	$('#genre').val('')
})

////////

function updateEvents(){
	
	$('.delete').click(function(){
		selectedIndex = parseInt($(this).attr("id"));
		movieContainer[selectedIndex].delete();
	})
	
	$('.edit').click(function(){
		let tempObj = movieContainer[$(this).prev().attr("id")];
		let parent = $(this).parent().parent().parent();
		let title = parent.find(".title");
		let genre = parent.find(".genre");
		let rating = parent.find(".rating");
		let oldTitle = title.text();
		let oldGenre = genre.text();
		let oldRating = rating.text();
		console.log(oldTitle, oldGenre, oldRating);
		rating.empty();
		rating.append(`<input class="list-group-item input-sm" type="text">`)
		title.empty()
		title.append(`<input class="list-group-item input-sm" type="text">`)
		genre.empty()
		genre.append(`<input class="list-group-item input-sm" type="text">`)
		genre.children().val(`${oldGenre}`);
		title.children().val(`${oldTitle}`);
		rating.children().val(`${oldRating}`);
	})
}


getMovies();
