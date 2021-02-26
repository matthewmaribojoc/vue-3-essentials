<template>
  <div class="recipe" v-if="meal">
    <p>{{ meal.strMeal }}</p>
    <p>{{ meal.strCategory }}</p>
    <p>{{ meal.strMealThumb }}</p>
    <p>{{ tags }}</p>
    <p>{{ directions }}</p>
    <p>{{ ingredients }}</p>
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

<style scoped></style>
