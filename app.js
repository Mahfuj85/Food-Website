//Load categoriers with a function
const loadCategory = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
}
loadCategory()

//Display the categories with another function
const displayCategories = (categories) => {
    const categoriesBox = document.getElementById('categories');
    categories.map(category=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="border-2 border-slate-400 rounded p-3">
            <img class="h-60 w-full" src="${category.strCategoryThumb} " alt="">
            <h5 class="text-xl">ID: ${category.idCategory}</h5>
            <h3 class="text-xl">Name: ${category.strCategory}</h3>
            <p>${category.strCategoryDescription.slice(0, 120)} ....</p>
        </div>
        `
        categoriesBox.appendChild(div)
    })
}

//Load foods by seach box with click function
document.getElementById('input-button').addEventListener("click", function(){
    const input = document.getElementById('input-field');
    const inputText = input.value;

    const detailsFoodBox = document.getElementById('food-details');
    detailsFoodBox.textContent = "";

    const categoriesBox = document.getElementById('categories');
    categoriesBox.innerHTML = "";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>displayFoods(data.meals))
    //input value clear
    input.value = "";
})

//Display foods by search box with another function 
const displayFoods = (foods)=>{
    const allFoodBox = document.getElementById('all-food');
    allFoodBox.innerHTML = "";
    foods.map(food=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick = "seeFoodDetails('${food.idMeal}')" class="border-2 border-slate-400 rounded p-3">
            <img class="h-60 w-full" src="${food.strMealThumb} " alt="">
            <h5 class="text-xl">ID: ${food.idMeal}</h5>
            <h3 class="text-xl">Name: ${food.strMeal}</h3>
            <h6 class="text-xl">Category: ${food.strCategory}</h6>
            <p>${food.strInstructions.slice(0, 150)} ....</p>
        </div>
        `
        allFoodBox.appendChild(div)
    })
}

//See food details by clicking a particular food item
const seeFoodDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>displayFoodDetails(data.meals[0]))
}

//Display food details by clicking a particular food item
const displayFoodDetails = (food) => {
    const detailsFoodBox = document.getElementById('food-details');
    detailsFoodBox.textContent = "";
    const div = document.createElement('div');
        div.innerHTML = `
        <div class="border-2 border-slate-400 rounded p-3">
            <img class="h-[500px] w-full" src="${food.strMealThumb} " alt="">
            <h5 class="text-xl">ID: ${food.idMeal}</h5>
            <h3 class="text-xl">Name: ${food.strMeal}</h3>
            <h6 class="text-xl">Category: ${food.strCategory}</h6>
            <p>${food.strInstructions} ....</p>
            <a target = "_blank" href="${food.strYoutube}" class=" my-5 block text-center w-40 mx-auto bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mx-5 text-white cursor-pointer">Go To Youtube</a>
        </div>
        `
        detailsFoodBox.appendChild(div)
        window.scrollTo({ top: 0, behavior: 'smooth' });
}


