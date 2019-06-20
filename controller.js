const fetch = require('node-fetch');
const Mealer = {
	async getMealData(req, res) {
  	try {
  	let id = {id: req.body.meal};
  	let url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' +id.id;

  	fetch(url)
  	.then(resp => resp.json())
  	.then(function(data){
  		mealRecipes = data;
  		console.table(mealRecipes);
  	})
    
  } catch (error) {
      console.log(error);
  }
}
}

module.exports = Mealer;
