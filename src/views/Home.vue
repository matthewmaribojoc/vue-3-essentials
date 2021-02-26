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
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  methods: {
    search() {
      console.log(this.query)
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
</style>
