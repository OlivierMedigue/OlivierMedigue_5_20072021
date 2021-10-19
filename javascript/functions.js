let allRecipesObject = []
let allRecipes = []
let allFilters = []
let totalFilterClicked = 0


function createRecipes() {

    recipes.forEach((oneRecipe) => {
        let newRecipeObject = new Recipe(oneRecipe.name, oneRecipe.time, oneRecipe.description)
        oneRecipe.ingredients.forEach((oneIngredient) => {
            let newIngredient = new Ingredient(oneIngredient.ingredient, oneIngredient.quantity, oneIngredient.unit);
            newRecipeObject.addIngredient(newIngredient);
        })
        oneRecipe.ustensils.forEach((oneUstensil) => {
            let newUstensil = new Ustensil(oneUstensil)
            newRecipeObject.addUstensil(newUstensil)
        })
        let newAppliance = new Appliance(oneRecipe.appliance)
        newRecipeObject.addAppliance(newAppliance)
        //fonction pour rajouter les appareils dans la classe principale Recipe
        allRecipes.push(newRecipeObject)
    })
    allRecipesObject = allRecipes
}

//------Fonction de récupération des données des filtres-----//

function createFilters() {

    let allIngredients = []
    let uniqueAllIngredients = []
    let allUstensils = []
    let uniqueAllUstensils = []
    let allAppliances = []
    let uniqueAllAppliances = []

    allRecipes.forEach((oneRecipe) => {
        oneRecipe.ingredients.forEach((oneIngredient) => {
            allIngredients.push(oneIngredient.name)
            allIngredients.flat()
            uniqueAllIngredients = [...new Set(allIngredients)]
            uniqueAllIngredients.sort()
        })
        oneRecipe.ustensils.forEach((oneUstensil) => {
            allUstensils.push(oneUstensil.name)
            allUstensils.flat()
            uniqueAllUstensils = [...new Set(allUstensils)]
            uniqueAllUstensils.sort()
        })
        oneRecipe.appliances.forEach((oneAppliance) => {
            allAppliances.push(oneAppliance.name)
            allAppliances.flat()
            uniqueAllAppliances = [...new Set(allAppliances)]
            uniqueAllAppliances.sort()
        })


    })
    allFilters = [uniqueAllIngredients, uniqueAllAppliances, uniqueAllUstensils]
    displayFilters()
}

//------Fonction de remplissage des filtres-----//

let activeFilters = []
function displayFilters() {
    let arrayConfig = [
        "list-ingredient",
        "list-appliance",
        "list-ustensile"
    ]
    arrayConfig.forEach((boxName, index) => {
        let container = document.getElementById(boxName)
        container.textContent = ""
        allFilters[index].forEach((oneElement) => {
            let elementToAdd = document.createElement("div")
            elementToAdd.classList.add("listing-element")
            elementToAdd.textContent = oneElement
            if (activeFilters.includes(oneElement) === false) {
                elementToAdd.addEventListener("click", function () {
                    activeFilters.push(oneElement)
                    selectElementInFilter(oneElement, index)
                })
            } else {
                elementToAdd.classList.add("selected-elt")
            }
            container.appendChild(elementToAdd)
        })
    })
}

//------Fonction d'ouverture des filtres-----//

function openFiltersBox() {
    document.getElementById("ingredient-icon-down").addEventListener("click", function () {
        document.getElementById("list-ingredient").classList.remove("hidden")
        document.getElementById("ingredient-icon-up").classList.remove("hidden")
        document.getElementById("ingredient-icon-down").classList.add("hidden")
        document.getElementById("box-ingredient").classList.add("box-modified-ingredient")
    })
    document.getElementById("ingredient-icon-up").addEventListener("click", function () {
        document.getElementById("list-ingredient").classList.add("hidden")
        document.getElementById("ingredient-icon-up").classList.add("hidden")
        document.getElementById("ingredient-icon-down").classList.remove("hidden")
        document.getElementById("box-ingredient").classList.remove("box-modified-ingredient")
    })
    document.getElementById("appliance-icon-down").addEventListener("click", function () {
        document.getElementById("list-appliance").classList.remove("hidden")
        document.getElementById("appliance-icon-up").classList.remove("hidden")
        document.getElementById("appliance-icon-down").classList.add("hidden")
        document.getElementById("box-appliance").classList.add("box-modified-appliance")
    })
    document.getElementById("appliance-icon-up").addEventListener("click", function () {
        document.getElementById("list-appliance").classList.add("hidden")
        document.getElementById("appliance-icon-up").classList.add("hidden")
        document.getElementById("appliance-icon-down").classList.remove("hidden")
        document.getElementById("box-appliance").classList.remove("box-modified-appliance")
    })
    document.getElementById("ustensile-icon-down").addEventListener("click", function () {
        document.getElementById("list-ustensile").classList.remove("hidden")
        document.getElementById("ustensile-icon-up").classList.remove("hidden")
        document.getElementById("ustensile-icon-down").classList.add("hidden")
        document.getElementById("box-ustensile").classList.add("box-modified-ustensile")
    })
    document.getElementById("ustensile-icon-up").addEventListener("click", function () {
        document.getElementById("list-ustensile").classList.add("hidden")
        document.getElementById("ustensile-icon-up").classList.add("hidden")
        document.getElementById("ustensile-icon-down").classList.remove("hidden")
        document.getElementById("box-ustensile").classList.remove("box-modified-ustensile")
    })
}


//------Fonction recupération des recettes en ajoutant des filtres-----//

function selectElementInFilter(filteredElement, typeOfElement) {
    totalFilterClicked += 1

    let type = [
        "ingredient",
        "appliance",
        "ustensile"
    ]

    addTagBox(filteredElement, typeOfElement)

    allRecipesObject.forEach(function (oneRecipe) {
        if (type[typeOfElement] === "ingredient") {
            oneRecipe.ingredients.forEach(function (oneIngredient) {
                if (filteredElement === oneIngredient.name) {
                    oneRecipe.hasFilters += 1
                    console.log("la recette", oneRecipe.name, "contient", oneIngredient.name)
                }
            })
        }
        if (type[typeOfElement] === "appliance") {
            oneRecipe.appliances.forEach(function (oneAppliance) {
                if (filteredElement === oneAppliance.name) {
                    oneRecipe.hasFilters += 1
                    console.log("la recette", oneRecipe.name, "contient", oneAppliance.name)
                }
            })
        }
        if (type[typeOfElement] === "ustensile") {
            oneRecipe.ustensils.forEach(function (oneUstensil) {
                if (filteredElement === oneUstensil.name) {
                    oneRecipe.hasFilters += 1
                    console.log("la recette", oneRecipe.name, "contient", oneUstensil.name)
                }
            })
        }
    })
    getValidRecipes()
}

//------Fonction recupération des recettes en enlevant des filtres-----//

function unselectElementInFilter(filteredElement, typeOfElement) {
    totalFilterClicked -= 1

    let type = [
        "ingredient",
        "appliance",
        "ustensile"
    ]

    allRecipes.forEach(function (oneRecipe) {
        if (type[typeOfElement] === "ingredient") {
            oneRecipe.ingredients.forEach(function (oneIngredient) {
                if (filteredElement === oneIngredient.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
        if (type[typeOfElement] === "appliance") {
            oneRecipe.appliances.forEach(function (oneAppliance) {
                if (filteredElement === oneAppliance.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
        if (type[typeOfElement] === "ustensile") {
            oneRecipe.ustensils.forEach(function (oneUstensil) {
                if (filteredElement === oneUstensil.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
    })
    getValidRecipes()
}

//------Fonction de recuperation des recettes valides-----//

function getValidRecipes() {
    let validRecipes = []
    allRecipesObject.forEach(function (oneRecipe) {
        if (oneRecipe.hasFilters === totalFilterClicked) {
            validRecipes.push(oneRecipe)
        }
    })
    allRecipes = validRecipes
    showRecipes()
    createFilters()
}

//------Fonction creation des tags-----//

function addTagBox(name, type) {

    let tagFilter = [
        "tagbox-ingredient",
        "tagbox-appliance",
        "tagbox-ustensils"
    ]
    let tagBarSelection = document.getElementById("tag-bar")
    let selectedElement = document.createElement("div")
    selectedElement.classList.add(`${tagFilter[type]}`)
    selectedElement.innerHTML += `<div class="text">${name}</div><div id="tag-icon-${name}-${tagFilter[type]}"><i class="far fa-times-circle"></i></div>`
    tagBarSelection.appendChild(selectedElement);
    let closeCross = document.getElementById(`tag-icon-${name}-${tagFilter[type]}`)
    closeCross.addEventListener("click", function () {
        unselectElementInFilter(name, type)
        selectedElement.remove()   
        activeFilters.forEach(function(oneFilter, index){
            if (oneFilter === name){
                activeFilters.splice(index, 1)
                displayFilters()
            }
        })            
    })     
}



//------Fonction d'affichage des recettes valides-----//

function showRecipes() {
    let container = document.getElementById("recipe")
    container.innerText = ""
    allRecipes.forEach(function (oneRecipe) {
        let template = `<div class="recipe-card">
                            <div class="recipe-img"></div>
                            <div class="recipe-content">
                                <div class="recipe-title">
                                    <h3>${oneRecipe.name}</h3>
                                    <div class="timer">
                                        <span class="timer-icon"><i class="far fa-clock"></i></span>
                                        <p>${oneRecipe.time}min</p>
                                    </div>
                                </div>
                                <div class="recipe-component">
                                    <ul class="ingredients">       
                                    ${oneRecipe.ingredients.map(elementOfIngredient => `
                                    <li>
                                        ${elementOfIngredient.name} : ${elementOfIngredient.quantity} ${elementOfIngredient.unit}
                                    </li>`).join("")}    
                                    </ul>
                                    <div class="recipe-instruction">
                                        <p>${oneRecipe.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
        container.innerHTML += template
    })
}
