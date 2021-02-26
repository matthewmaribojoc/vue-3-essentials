<template>
  <div class="recipe" v-if="meal">
    <div class="recipe-header">
      <img :src="meal.strMealThumb" />
      <div class="recipe-header__text">
        <h3>{{ meal.strCategory }}</h3>
        <h1>{{ meal.strMeal }}</h1>
        <button>Watch on Youtube</button>
        <ul class="recipe-tags" v-if="tags">
          <li v-for="tag in tags" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
    <div class="recipe-content">
      <div class="ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li v-for="ingredient in ingredients" :key="ingredient.name">
            {{ ingredient.name }} - {{ ingredient.amount }}
          </li>
        </ul>
      </div>
      <div class="directions">
        <h2>Directions</h2>
        <ol>
          <li v-for="direction in directions" :key="direction">
            {{ direction }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const id = route.query.id

    const meal = ref(null)
    const tags = computed(() => {
      return meal.value.strTags ? meal.value.strTags.split(',') : []
    })

    const directions = computed(() => {
      return meal.value.strInstructions
        .split('\r\n')
        .filter((s) => s.length > 0)
    })

    const ingredients = computed(() => {
      let ret = []
      for (var i = 1; i <= 20; i++) {
        if (meal.value['strIngredient' + i]) {
          ret.push({
            name: meal.value['strIngredient' + i],
            amount: meal.value['strMeasure' + i],
          })
        }
      }
      return ret
    })

    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
      .then((response) => response.json())
      .then((data) => {
        meal.value = data.meals[0]
      })
      .catch((error) => {
        router.push('/')
      })

    return {
      directions,
      ingredients,
      meal,
      tags,
    }
  },
}
</script>

<style scoped>
.recipe {
  width: 80%;
  min-width: 400px;
  margin: 20px auto;
  padding: 50px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  text-align: left;
}

.recipe-header {
  display: flex;
  background-color: #e67e22;
  padding: 10px;
  border-radius: 10px;
}

.recipe-header img {
  width: 200px;
  height: auto;
  margin-right: 20px;
  border-radius: 10px;
}

.recipe-header__text h3,
.recipe-header__text h1 {
  margin: 0;
  color: white;
}

.recipe-header__text button {
  outline: none;
  border: none;
  font: inherit;
  background-color: #2c3e50;
  color: white;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.recipe-content {
  display: flex;
}

.ingredients {
  width: 30%;
  padding-right: 5%;
  box-sizing: border-box;
}

.directions {
  width: 70%;
}
</style>
