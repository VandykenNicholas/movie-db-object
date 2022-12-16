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
					<div class="col clickMe " ">
						<div class="card bg-secondary" style="width: 18rem;">
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
	let movie = new Movie("N/A", title, genre, rating, "n/a");
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
		let btnBody = $(this).parent();
		let oldBtnG = btnBody.html();
		rating.empty();
		rating.append(`<input class="list-group-item input-sm" type="text" id="newRating">`)
		title.empty()
		title.append(`<input class="list-group-item input-sm bg-light" type="text" id="newTitle">`)
		genre.empty()
		genre.append(`<input class="list-group-item input-sm" type="text" id="newGenre">`)
		genre.children().val(`${oldGenre}`);
		title.children().val(`${oldTitle}`);
		rating.children().val(`${oldRating}`);
		btnBody.html(`<button class="btn btn-danger delete" type="button" id="cancel">Cancel</button>
							    <button class="btn btn-success edit" type="button" id="change">Save</button>`);
		
		$(`#change`).click(function(){
			console.log($(`#newTitle`).val(), $(`#newGenre`).val(), $(`#newRating`).val())
			let edit = new Movie(tempObj.id, $(`#newTitle`).val(), $(`#newGenre`).val(), $(`#newRating`).val(), "n/a")
			edit.edit();
		})
		$(`#cancel`).click(function(){
			status()
		})
		parent.mouseleave(function(){
				status();
			});
		
		function status (){
			btnBody.html(oldBtnG);
			rating.empty();
			title.empty()
			genre.empty()
			rating.text(oldRating);
			genre.text(oldGenre);
			title.text(oldTitle);
			parent.off();
			updateEvents();
		}
		
	})
}


getMovies();
