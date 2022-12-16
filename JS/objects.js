function Movie(id, title, genre, rating){
		this.id = id
		// this.poster = poster
		this.title = title
		this.genre = genre
		// this.plot = plot
		this.rating = rating
		// this.iRating = irating
	
	
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
		
		}
		
		
		this.thisId = function(){
			return this.id;
		}
}


/////      https://puffy-thoracic-peanut.glitch.me/movies

/////      http://www.omdbapi.com/?apikey=91940b5a&t=&plot=short&y=1991
