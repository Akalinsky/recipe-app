import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: [
      {
        name: 'Spicy Sausage Ragu',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 2',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 2',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 3',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 3',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 4',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 4',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 5',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 5',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      }, {
        name: 'Spicy Sausage Ragu 6',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 6',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 7',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 7',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 8',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 8',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      },
      {
        name: 'Spicy Sausage Ragu 9',
        tags: [
          'italian',
          'spicy',
          'pasta',
          'sauce'
        ],
        description: 'A spicy pork sausage tomato cream sauce',
        steps: [
          'Brown sausage in a large pot',
          'Add parsley and cook breifly',
          'Add white wine and cook until slightly reduced',
          'Add heavy cream and cook until slightly reduced',
          'Add marinara sauce and water (rinse the jar) and cook, stirring occasionally for 1 hour up to 3 hours',
          'Add parmesan cheese and salt to taste',
          'Serve over short pasta'
        ],
        ingredients: {
          'spicy pork sausage': '1 lbs',
          parsley: '2 tbsp',
          'heavy cream': 'quarter pint',
          'marinara sauce': '16 oz jar',
          'parmesan cheese': 'to taste',
          salt: 'to taste'
        }
      },
      {
        name: 'Pork Carnitas 9',
        tags: [
          'Mexican',
          'tacos',
          'meat',
          'slow-cooker'
        ],
        description: 'A Mexican slow cooked pork, typically is slightly crispy',
        steps: [
          'Preheat oven to 275 &deg; F',
          'Cut pork shoulder into 1.5-2 inch equally sized pieces',
          'Add ingredients to oven and broiler safe baking dish',
          'Bake, tightly covered in aluminium foil for 3.5 hours or until fork tender',
          'Remove pork from dish, discard garlic, bay leaves, and orange peel, and reserve cooking liquid',
          'Return pork to dish, drizzling cooking liquid over',
          'broil on high until pork is slightly crispy on top'
        ],
        ingredients: {
          'pork shoulder': '3 lbs',
          'bay leaves': '2, torn in half',
          cinnamon: '3/4 tsp',
          'kosher salt': '1 tbsp',
          garlic: '8 cloves, peeled',
          cumin: '1 tsp',
          'black pepper': '1 tsp',
          'Chinese Five Spice': '1/2 teaspoon',
          'olive oil': '1/4 cup',
          orange: '1, juiced, parts of peel removed and sliced into thin strips'
        }
      }
    ],
    currentRecipe: 0
  },
  mutations: {
    changeCurrentRecipe (state, recipeIndex) {
      state.currentRecipe = recipeIndex
    }
  },
  actions: {
    changeCurrentRecipe (context, recipeIndex) {
      context.commit('changeCurrentRecipe', recipeIndex)
    }
  },
  getters: {

  },
  modules: {
  }
})
