function Movie(id, title, genre, rating, index){
		this.id = id
		this.title = title
		this.genre = genre
		this.rating = rating
		this.index = index;
	
		this.delete = function () {
			fetch(`https://puffy-thoracic-peanut.glitch.me/movies/`+this.id, {
				method: `DELETE`
			}).then(()=> console.log("Deleted:  " + this.id))
				.then(() => getMovies());
			
		}
		
		this.add = function(){
			
			let raw =
				{
					title: this.title,
					rating: this.rating,
					genre: this.genre,
				}
			;
			
		let requestOptions = {
			method: 'POST',
				headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(raw),
		};
	
			fetch("https://puffy-thoracic-peanut.glitch.me/movies", requestOptions)
				.then(()=> console.log("added movie: "+this.title))
				.then(()=> getMovies());
			
		}
		this.edit = function(){
			let raw =
				{
					title: this.title,
					genre: this.genre,
					rating: this.rating,
				}
			;
			
			let requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(raw),
			};
			
			fetch("https://puffy-thoracic-peanut.glitch.me/movies/"+this.id, requestOptions)
				.then(()=> console.log("Edited movie: "+this.title))
				.then(()=> getMovies());
			
		}
		
		this.thisId = function(){
			return this.id;
		}
}


/////      https://puffy-thoracic-peanut.glitch.me/movies

/////      http://www.omdbapi.com/?apikey=91940b5a&t=&plot=short&y=1991
