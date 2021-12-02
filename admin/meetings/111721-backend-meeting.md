MEETING 11/17/21
Wesley
Hugs
Brandon
Daniel
what we have so far
		functioning get recipe by id
		store and retrieve from localstorage
NOTE **
		any time you test putting in to local storage, also test getting back from localstorage
				make sure you can do like .name to access fields as though it were an object
what we need to do
		write function to get recipe instructions
			figure out which parts of thejson are necessary
		delete recipe function
				find the recipe to delete in recipes
				call update local storage
		update recipe function
				parameter: full recipe
				replace the old version of the recipe in recipes
				update local storage
		start messing with search endpoints
				test what different queries send back
		get reccomended recipes function for the search page
				get random recipes - if they have none or only ones that they have created
				get similar recipes - if they have recipes from spoonacular
		createRecipe function
				set the recipes variable
				update localstorage
		set recipes variable to recipes from localstorage
				grab recipes from localstorage and set to local variable
notes for other teams
		remove created by from recipe full page mock up
		remove cuisine type	from recipe full page mock up
		determine which tags to be shown
