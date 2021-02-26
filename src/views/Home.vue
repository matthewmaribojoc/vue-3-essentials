<template>
  <div class="home">
    <div class="search">
      <h1>Find a Recipe</h1>
      <input
        type="text"
        placeholder="Enter a recipe name"
        v-model="query"
        @keydown.enter="search"
      />
      <button @click="search">Search</button>
    </div>
    <div class="results">
      <div class="results-header" v-if="currentQuery.length > 0">
        <p>{{ meals.length }} results for {{ currentQuery }}</p>
        <p>
          Filter results
          <select v-model="searchFilter">
            <option value="">View All</option>
            <option
              v-for="category in searchFilterOptions"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </p>
      </div>
      <div class="results-cards">
        <recipe-card
          v-for="meal in filteredMeals"
          :key="meal.idMeal"
          :recipe-name="meal.strMeal"
          :category="meal.strCategory"
          :thumbnail="meal.strMealThumb"
          :tags="meal.strTags ? meal.strTags.split(',') : []"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      currentQuery: '',
      query: '',
      meals: [],
      searchFilter: '',
    }
  },
  methods: {
    search() {
      if (this.query.trim().length == 0) {
        this.meals = []
        this.currentQuery = ''
        return
      }
      fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.query
      )
        .then((response) => response.json())
        .then((data) => {
          this.meals = data.meals
          this.currentQuery = this.query
        })
    },
  },
  computed: {
    searchFilterOptions() {
      let categories = []
      this.meals.forEach((meal) => {
        if (meal.strCategory && categories.indexOf(meal.strCategory) == -1) {
          categories.push(meal.strCategory)
        }
      })
      return categories
    },
    filteredMeals() {
      if (this.searchFilter.length == 0) {
        return this.meals
      }

      return this.meals.filter((meal) => {
        return meal.strCategory && meal.strCategory == this.searchFilter
      })
    },
  },
}
</script>

<style scoped>
.search {
  background-color: #eee;
  text-align: center;
  padding: 30px 0;
}

.search input[type='text'] {
  border: none;
  outline: none;
  width: 80%;
  max-width: 500px;
  display: block;
  margin: 50px auto;
  padding: 20px;
  font-size: 1.5em;
  border-radius: 5px;
}

.search button {
  border: none;
  outline: none;
  background-color: #e67e22;
  color: white;
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 1.5em;
  border-radius: 5px;
  cursor: pointer;
}

.results-header {
  padding: 20px 0;
}

.results-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
