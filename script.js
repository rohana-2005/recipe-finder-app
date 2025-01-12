const enter = document.querySelector("#enter");
const search = document.querySelector("#search");
const img_contain = document.querySelector(".img-contain");
const line = document.querySelector("#line");
const info = document.querySelector(".info");
info.innerHTML='';

search.addEventListener('click', () => {
    
    img_contain.innerHTML='';
    let item = enter.value;
    if(item === "")
    {
        alert("Please enter a item");
    }
    if(item !== "")
    {
        getData(item);
    }
})



async function getData(item) 
{
    line.innerText = "Fetching Recipes..."
    console.log(item);
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`;
    let response = await fetch(url);
    let data = await response.json();
    line.innerText = item;
    console.log(data["meals"][1]);

    for(let i=0; i<data["meals"].length; i++)
    {
        const imgContainer = document.createElement('div');
        imgContainer.style.textAlign = 'center'; 
        let meal = data["meals"][i];
        const img = document.createElement('img');
        img.src = meal["strMealThumb"];
        img.style.height='240px';
        img_contain.alt = 'Image ' + (i + 1);
        img.style.margin = '10px';
        const text = document.createElement('p');
        text.innerHTML = `
        <strong>${meal["strMeal"]}</strong> <br> 
        <span style="font-size: 0.8em;"><strong>${meal["strArea"]}</strong> Dish</span> <br> 
        <span style="font-size: 0.8em;">Belongs to <strong>${meal["strCategory"]}</strong> Category</span>`;

        const view = document.createElement('button');
        view.innerHTML = "View Recipe";
        view.style.margin = '15px 0 0 0';

        text.style.margin = '10px 0 0 0';

        imgContainer.appendChild(img);
        imgContainer.appendChild(text);
        imgContainer.appendChild(view);
        img_contain.appendChild(imgContainer);

        view.addEventListener('click', () => {
            info.style.backgroundColor = "white";
            info.style.overflowY = "scroll";  
            info.style.scrollbarWidth="none";

            info.style.maxHeight = "200px";
            info.innerHTML = ''; 
            const cross = document.createElement('i');
            cross.innerHTML = '<button><i class="fa-solid fa-x"></i></button>';
            info.appendChild(cross);
            
            const title = document.createElement('h2');
            title.innerHTML = `${meal["strMeal"]}`;
            info.appendChild(title);

            let ingr = (meal) => {
                let ingrediantList = "";
                for(let i=1; i<=20; i++)
                {
                    let ingrediant = meal[`strIngrediants${i}`];
                    if(ingrediant != null)
                    {
                        let measure = meal[`strMeasure${i}`];
                        ingrediantList += `<li>${ingrediant}: ${measure}</li>`;
                    }
                    else
                    {
                        break;
                    }
                }
                return ingrediantList;
            }

            const recipeDetails = document.createElement('p');
            recipeDetails.innerHTML = `<strong>Recipe:</strong> ${meal["strInstructions"]}`;
            info.appendChild(recipeDetails);

            

            

            cross.addEventListener('click', () => {
                info.innerHTML = ''; 
                info.style.backgroundColor = 'transparent';
                info.style.overflowY = "hidden";
                
            })

        });

    }
}
