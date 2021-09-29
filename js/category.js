$(document).ready(() => {
  $(window).scroll(() => {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }
  });
});

// declaring variables
const categorySelect = document.getElementById("category");
const recipeContentLink = document.querySelector(".recipe-content-link");
const allRecipes = document.querySelector(".all-recipes");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeDetails = document.querySelector("recipe-details");

//Recipe Details Content Close Btn
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.classList.remove("showRecipe");
});

categorySelect.addEventListener("click", () => {
  let strUser = categorySelect.options[categorySelect.selectedIndex].text;
  console.log(strUser);
  // fetching api
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strUser}`).then(
    (response) =>
      response.json().then((data) => {
        //    console.log(data);
        let html = "";
        if (data.meals) {
          data.meals.forEach((meal) => {
            html += `
                    <div class="recipe-item" data-id="${meal.idMeal}">
                        <div class="recipe-img">
                            <img src="${meal.strMealThumb}" alt="recipe-img">
                        </div>
                        <div class="recipe-info">
                            <h4 class="recipe-name">"${meal.strMeal}"</h4>
                            <a href="#" class="recipe-content-link">Get Recipe</a>
                        </div>
                    </div>
                `;
          });
          allRecipes.classList.remove("notfound");
        } else {
          html = `<h4>Sorry, we didn't find this.</h4>`;
          allRecipes.classList.add("notfound");
        }
        allRecipes.innerHTML = `${html}`;
      })
  );
});
// Adding Recipe Details-Content
allRecipes.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("recipe-content-link")) {
    let recipeItem = e.target.parentElement.parentElement;
    fetch(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${recipeItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => recipeModal(data.meals));
  }
});

function recipeModal(meal) {
  meal = meal[0];
  let html = `
            	    <h4 class="recipe-title">"${meal.strMeal}"</h4>
                    <p class="recipe-category">"${meal.strCategory}"</p>
                    <div class="recipe-instructions">
                        <h5>Instructions:</h5>
                        <p>"${meal.strInstructions}"</p>
                    </div>
                    <div class="recipe-details-img">
                        <img src="${meal.strMealThumb}" alt="recipe-img">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strSource}" target="_blank">See Recipe</a>
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
    `;
  recipeDetailsContent.innerHTML = html;
  recipeDetailsContent.parentElement.classList.add("showRecipe");
}

//----> top cursor <----
topbtn = document.getElementById("top-btn");
window.onscroll=function(){scrollFunction()};
function scrollFunction(){
    if(document.body.scrollTop >100 || document.documentElement.scrollTop>100){
        topbtn.style.display="block";
    }else{
        topbtn.style.display="none";
    }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
