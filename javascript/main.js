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
    // console.log("On crée un nouveeau produit")
    let newRecipe = new Recipe(oneRecipe.name, oneRecipe.time, oneRecipe.description)
    oneRecipe.ingredients.forEach((oneIngredient) => {
        // console.log("On crée un nouvel ingrédient")
        let newIngredient = new Ingredient(oneIngredient.ingredient, oneIngredient.quantity, oneIngredient.unit);
        newRecipe._addIngredient(newIngredient);
        allIngredients.push(newIngredient.name);
    })
    oneRecipe.ustensils.forEach((oneUstensil) => {
        // console.log("On crée un nouvel ustensil")
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
allUstensils.flat()
let uniqueAllUstensils = []
uniqueAllUstensils = [...new Set(allUstensils)]
uniqueAllUstensils.sort()
// console.table(uniqueAllUstensils)
let uniqueAllIngredients = []
uniqueAllIngredients = [...new Set(allIngredients)]
uniqueAllIngredients.sort()
// console.table(uniqueAllIngredients)
let uniqueAllAppliances = []
uniqueAllAppliances = [...new Set(allAppliances)]
uniqueAllAppliances.sort()
// console.table(uniqueAllAppliances)

const tagBarSelection = document.getElementById("tag-bar");

/*------Filtre ingredients------*/

const openIngredientFilter = document.getElementById("ingredient-icon-down");
const closeIngredientFilter = document.getElementById("ingredient-icon-up");
const listingIngredients = document.getElementById("list-ingredient");
const displayIngredientBox = document.getElementById("box-ingredient");
// Ouverture du listing Ingredients
openIngredientFilter.addEventListener("click",listOfIngredients);

uniqueAllIngredients.forEach((Ingredient) => {
    listingIngredients.innerHTML += `<div class="toto">${Ingredient}</div>`
})
function listOfIngredients() {
    displayIngredientBox.classList.add("box-modified-ingredient");
    listingIngredients.classList.remove("hidden");
    openIngredientFilter.classList.add("hidden");
    closeIngredientFilter.classList.remove("hidden");
    listingIngredients.addEventListener("click", tagIngredient); 
}

//Fonction du Tag Ingredient//

function tagIngredient(){
    let newDivSelect = document.createElement("div");
    tagBarSelection.appendChild(newDivSelect);
    newDivSelect.classList.add("tagbox-ingredient");
    newDivSelect.innerHTML += '<div class="text">Bol</div> <div id="tag-icon"><i class="far fa-times-circle"></i></div>'
    let closeTagIngredient = document.getElementById("tag-icon");
    closeTagIngredient.addEventListener("click",closeSelectedIngredientTag);
    function closeSelectedIngredientTag(){
        newDivSelect.remove();
    }
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

// Ouverture du listing Appareils
uniqueAllAppliances.forEach((Appliance) => {
    listingAppareils.innerHTML += `<div class="toto">${Appliance}</div>`
})
openAppareilFilter.addEventListener("click",listOfAppareils);
function listOfAppareils() {
    displayAppareilBox.classList.add("box-modified-appareil");
    listingAppareils.classList.remove("hidden");
    openAppareilFilter.classList.add("hidden");
    closeAppareilFilter.classList.remove("hidden");
    listingAppareils.addEventListener("click", tagAppliance);   
}
//Fonction du Tag Appareil//

function tagAppliance(){
    let newDivSelect = document.createElement("div");
    tagBarSelection.appendChild(newDivSelect);
    newDivSelect.classList.add("tagbox-appliance");
    newDivSelect.innerHTML += '<div class="text">Bol</div> <div id="tag-icon"><i class="far fa-times-circle"></i></div>'
    let closeTagAppliance = document.getElementById("tag-icon");
    closeTagAppliance.addEventListener("click",closeSelectedApplianceTag);
    function closeSelectedApplianceTag(){
        newDivSelect.remove();
    }
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

// Ouverture du listing Ustensiles
openUstensileFilter.addEventListener("click",listOfUstensiles);
uniqueAllUstensils.forEach((Ustensil) => {
    listingUstensiles.innerHTML += `<div class="toto">${Ustensil}</div>`
})
function listOfUstensiles() {
    displayUstensileBox.classList.add("box-modified-ustensile");
    listingUstensiles.classList.remove("hidden");
    openUstensileFilter.classList.add("hidden");
    closeUstensileFilter.classList.remove("hidden");
    listingUstensiles.addEventListener("click", tagUstensil);    
}
//Fonction du Tag Ustensile//

function tagUstensil(){
    let newDivSelect = document.createElement("div");
    tagBarSelection.appendChild(newDivSelect);
    newDivSelect.classList.add("tagbox-ustensils");
    newDivSelect.innerHTML += '<div class="text">Bol</div> <div id="tag-icon"><i class="far fa-times-circle"></i></div>'
    let closeTagUstensile = document.getElementById("tag-icon");
    closeTagUstensile.addEventListener("click",closeSelectedUstensileTag);
    function closeSelectedUstensileTag(){
        newDivSelect.remove();
    }
}
// Fermeture du listing Ustensiles
closeUstensileFilter.addEventListener("click", closeListOfUstensiles);
function closeListOfUstensiles() {
    displayUstensileBox.classList.remove("box-modified-ustensile");
    listingUstensiles.classList.add("hidden");
    closeUstensileFilter.classList.add("hidden");
    openUstensileFilter.classList.remove("hidden");
}
