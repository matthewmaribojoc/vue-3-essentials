import { ref } from 'vue'

export function useSearch() {
  const query = ref('')
  const currentQuery = ref('')
  const meals = ref([])

  const search = () => {
    if (query.value.trim().length == 0) {
      meals.value = []
      currentQuery.value = ''
      return
    }
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query.value)
      .then((response) => response.json())
      .then((data) => {
        meals.value = data.meals
        currentQuery.value = query.value
      })
  }

  return {
    query,
    currentQuery,
    meals,
    search,
  }
}
