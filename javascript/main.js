import {recipes} from './recipes.js'

class Recipe {
    constructor(name, time, description) {
        this.name = name
        this.time = time
        this.description = description
        this.ingredients = []
        this.appliances = []
        this.ustensils = []
        this.hasFilters = 0;
    }
    _addIngredient(ingredient){
        this.ingredients.push(ingredient)
    }
    _addUstensil(ustensil){
        this.ustensils.push(ustensil)
    }
    _addAppliance(appliance){
        this.appliances.push(appliance)
    }
    _addUstensilFilter(ustensilName){
        this.ustensils.forEach((oneUstensil) => {
            if (oneUstensil.name === ustensilName) {
                oneUstensil.isChecked = true
                this.hasFilters += 1
            }
        })
    }
    _removeUstensilFilter(ustensilName){
        this.ustensils.forEach((oneUstensil) => {
            if (oneUstensil.name === ustensilName) {
                oneUstensil.isChecked = false
                this.hasFilters -= 1
            }
        })
    }
}
class Ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.isChecked = false;
    }
}
class Appliance {
    constructor(name) {
        this.name = name;
        this.isChecked = false;
    }
}
class Ustensil {
    constructor(name) {
        this.name = name;
        this.isChecked = false;
    }
}
let allRecipesOnObject = []
let allIngredients = []
let allUstensils = []
let allAppliances = []


recipes.forEach((oneRecipe)=> {
    let newRecipe = new Recipe(oneRecipe.name, oneRecipe.time, oneRecipe.description)
    oneRecipe.ingredients.forEach((oneIngredient) => {
        let newIngredient = new Ingredient(oneIngredient.ingredient, oneIngredient.quantity, oneIngredient.unit);
        newRecipe._addIngredient(newIngredient);
        allIngredients.push(newIngredient.name);
    })
    oneRecipe.ustensils.forEach((oneUstensil) => {
        let newUstensil = new Ustensil(oneUstensil)
        newRecipe._addUstensil(newUstensil)
        allUstensils.push(newUstensil.name) 
    })
    let newAppliance = new Appliance(oneRecipe.appliance)
    newRecipe._addAppliance(newAppliance)
    allAppliances.push(newAppliance.name)
    //fonction pour rajouter les appareils dans la classe principale Recipe
    allRecipesOnObject.push(newRecipe)
})

//Création des tableaux uniques triés//
//-------Tableau Ustensiles-------//
allUstensils.flat()
let uniqueAllUstensils = []
uniqueAllUstensils = [...new Set(allUstensils)]
uniqueAllUstensils.sort()
//-------Tableau Ingrédients-------//
let uniqueAllIngredients = []
uniqueAllIngredients = [...new Set(allIngredients)]
uniqueAllIngredients.sort()
//-------Tableau Appareils-------//
let uniqueAllAppliances = []
uniqueAllAppliances = [...new Set(allAppliances)]
uniqueAllAppliances.sort()


const tagBarSelection = document.getElementById("tag-bar");

/*------Filtre ingredients------*/

const openIngredientFilter = document.getElementById("ingredient-icon-down");
const closeIngredientFilter = document.getElementById("ingredient-icon-up");
const listingIngredients = document.getElementById("list-ingredient");
const displayIngredientBox = document.getElementById("box-ingredient");

uniqueAllIngredients.forEach((Ingredient) => {
    let ingredientTag = document.createElement("div");
    ingredientTag.classList.add("listing-element");
    ingredientTag.innerText = Ingredient;
    ingredientTag.setAttribute("data-content", Ingredient);
    ingredientTag.addEventListener("click", tagIngredient);
    listingIngredients.appendChild(ingredientTag);
})

//Fonction du Tag Ingredient//
function tagIngredient() {
    let ingredientName = this.getAttribute("data-content");
    let divOfElement = document.querySelector(`div[data-content="${ingredientName}"]`);
    divOfElement.removeEventListener("click", tagIngredient);
    divOfElement.classList.add("selected-elt");
    let selectedElement = document.createElement("div");
    tagBarSelection.appendChild(selectedElement);
    selectedElement.classList.add("tagbox-ingredient");
    selectedElement.innerHTML += `<div class="text">${ingredientName}</div> <div id="tag-icon-${ingredientName}"><i class="far fa-times-circle"></i></div>`;
    let closeTagIngredient = document.getElementById(`tag-icon-${ingredientName}`);
    closeTagIngredient.addEventListener("click", function(){
        selectedElement.remove();
        divOfElement.addEventListener("click", tagIngredient);
        divOfElement.classList.remove("selected-elt");
    });
}

// Ouverture du listing Ingredients
openIngredientFilter.addEventListener("click",listOfIngredients);
function listOfIngredients() {
    displayIngredientBox.classList.add("box-modified-ingredient");
    listingIngredients.classList.remove("hidden");
    openIngredientFilter.classList.add("hidden");
    closeIngredientFilter.classList.remove("hidden");
}

// Fermeture du listing Ingredients
closeIngredientFilter.addEventListener("click", closeListOfIngredients);
function closeListOfIngredients() {
    displayIngredientBox.classList.remove("box-modified-ingredient");
    listingIngredients.classList.add("hidden");
    closeIngredientFilter.classList.add("hidden");
    openIngredientFilter.classList.remove("hidden");
}

/*------Filtre Appareil------*/

const openAppareilFilter = document.getElementById("appareil-icon-down");
const closeAppareilFilter = document.getElementById("appareil-icon-up");
const listingAppareils = document.getElementById("list-appareil");
const displayAppareilBox = document.getElementById("box-appareil");

uniqueAllAppliances.forEach((Appliance) => {
    let ApplianceTag = document.createElement("div");
    ApplianceTag.classList.add("listing-element");
    ApplianceTag.innerText = Appliance;
    ApplianceTag.setAttribute("data-content", Appliance);
    ApplianceTag.addEventListener("click", tagAppliance);
    listingAppareils.appendChild(ApplianceTag);
})

//Fonction du Tag Appareil//
function tagAppliance(){
    let applianceName = this.getAttribute("data-content");
    let divOfElement = document.querySelector(`div[data-content="${applianceName}"]`);
    divOfElement.removeEventListener("click", tagAppliance);
    divOfElement.classList.add("selected-elt");
    let selectedElement = document.createElement("div");
    tagBarSelection.appendChild(selectedElement);
    selectedElement.classList.add("tagbox-appliance");
    selectedElement.innerHTML += `<div class="text">${applianceName}</div> <div id="tag-icon-${applianceName}"><i class="far fa-times-circle"></i></div>`;
    let closeTagAppliance = document.getElementById(`tag-icon-${applianceName}`);
    closeTagAppliance.addEventListener("click", function(){
        selectedElement.remove();
        divOfElement.addEventListener("click", tagAppliance);
        divOfElement.classList.remove("selected-elt");
    });
}

// Ouverture du listing Appareils
openAppareilFilter.addEventListener("click", listOfAppareils);
function listOfAppareils() {
    displayAppareilBox.classList.add("box-modified-appareil");
    listingAppareils.classList.remove("hidden");
    openAppareilFilter.classList.add("hidden");
    closeAppareilFilter.classList.remove("hidden");
}

// Fermeture du listing Appareils
closeAppareilFilter.addEventListener("click", closeListOfAppareils);
function closeListOfAppareils() {
    displayAppareilBox.classList.remove("box-modified-appareil");
    listingAppareils.classList.add("hidden");
    closeAppareilFilter.classList.add("hidden");
    openAppareilFilter.classList.remove("hidden");
}

/*------Filtre Ustensiles------*/

const openUstensileFilter = document.getElementById("ustensile-icon-down");
const closeUstensileFilter = document.getElementById("ustensile-icon-up");
const listingUstensiles = document.getElementById("list-ustensile");
const displayUstensileBox = document.getElementById("box-ustensile");

uniqueAllUstensils.forEach((Ustensil) => {
    let UstensilsTag = document.createElement("div");
    UstensilsTag.classList.add("listing-element");
    UstensilsTag.innerText = Ustensil;
    UstensilsTag.setAttribute("data-content", Ustensil);
    UstensilsTag.addEventListener("click", tagUstensiles);
    listingUstensiles.appendChild(UstensilsTag);
})

//Fonction du Tag Ustensile//
function tagUstensiles(){
    let ustensileName = this.getAttribute("data-content");
    let divOfElement = document.querySelector(`div[data-content="${ustensileName}"]`);
    divOfElement.removeEventListener("click", tagUstensiles);
    divOfElement.classList.add("selected-elt");
    let selectedElement = document.createElement("div");
    tagBarSelection.appendChild(selectedElement);
    selectedElement.classList.add("tagbox-ustensils");
    selectedElement.innerHTML += `<div class="text">${ustensileName}</div> <div id="tag-icon-${ustensileName}"><i class="far fa-times-circle"></i></div>`;
    let closeTagUstensile = document.getElementById(`tag-icon-${ustensileName}`);
    closeTagUstensile.addEventListener("click", function(){
        selectedElement.remove();
        divOfElement.addEventListener("click", tagUstensiles);
        divOfElement.classList.remove("selected-elt");
    });
}

// Ouverture du listing Ustensiles
openUstensileFilter.addEventListener("click",listOfUstensiles);
function listOfUstensiles() {
    displayUstensileBox.classList.add("box-modified-ustensile");
    listingUstensiles.classList.remove("hidden");
    openUstensileFilter.classList.add("hidden");
    closeUstensileFilter.classList.remove("hidden");
}

// Fermeture du listing Ustensiles
closeUstensileFilter.addEventListener("click", closeListOfUstensiles);
function closeListOfUstensiles() {
    displayUstensileBox.classList.remove("box-modified-ustensile");
    listingUstensiles.classList.add("hidden");
    closeUstensileFilter.classList.add("hidden");
    openUstensileFilter.classList.remove("hidden");
}
