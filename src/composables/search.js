import { reactive, toRefs, onUpdated, watchEffect } from 'vue'

export function useSearch() {
  const state = reactive({
    query: '',
    currentQuery: '',
    meals: [],
  })

  onUpdated(() => {
    console.log('updated')
  })

  let autocomplete
  watchEffect(() => {
    clearTimeout(autocomplete)
    let query = state.query

    autocomplete = setTimeout(() => {
      console.log(query)
    }, 1000)
  })

  const search = () => {
    if (state.query.trim().length == 0) {
      state.meals = []
      state.currentQuery = ''
      return
    }
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + state.query)
      .then((response) => response.json())
      .then((data) => {
        state.meals = data.meals
        state.currentQuery = state.query
      })
  }

  console.log(toRefs(state))

  return {
    ...toRefs(state),
    search,
  }
}
