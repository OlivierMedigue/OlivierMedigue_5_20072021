class Recipe {
    constructor(name, time, description) {
        this.name = name
        this.time = time
        this.description = description
        this.ingredients = []
        this.appliances = []
        this.ustensils = []
        this.hasFilters = 0
        this.hasInput = false
    }

    addIngredient(ingredient){
        this.ingredients.push(ingredient)
    }

    addAppliance(appliance){
        this.appliances.push(appliance)
    }

    addUstensil(ustensil){
        this.ustensils.push(ustensil)
    }
}

class Ingredient {
    constructor(name, quantity, unit = "") {
        this.name = name
        if (quantity === undefined){
            quantity = "non défini"
        }
        this.quantity = quantity
        this.unit = unit
    }
}

class Ustensil {
    constructor(name) {
        this.name = name
    }
}

class Appliance {
    constructor(name) {
        this.name = name
    }
}