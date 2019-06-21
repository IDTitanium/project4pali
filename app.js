const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000
const Mealer = require('./controller');
const fetch = require('node-fetch');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


app.listen(port, () => {
  console.log('listening on port ' + port);
});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response){
	response.render('index')
})

app.post('/', function(request, response){
	let mealId = request.body.meal;
	let ids = mealId.split(" ")
	let mealArr = []

	for(i=0;i<=ids.length;i++){
		let id = ids[i]
	let url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' +id;
  	fetch(url)
  	.then(resp => resp.json())
  	.then(function(data){
  		mealRecipes = data;
  		mealArr.push(mealRecipes.meals[i])
  	})
	}

	const ing = (mealArr) => {
		let len = mealArr.length
		let ingLenArr = []
	for(i=0;i<=len;i++){
		if(mealArr.strIngredient+i != 'null' && mealArr.strIngredient+i != '')
		ingLenArr.push(mealArr.strIngredient+i)
	}

	return Number.max(ingLenArr)
	}
	
});

