<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/recipe-logo.png" />
      <h2>{{ formattedTitle }}</h2>
    </div>
    <nav>
      <a href="#"> Home </a>
      <a href="#" @click="loadRandomRecipe"> Random Recipe </a>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadRandomRecipe(evt) {
      evt.preventDefault()
      console.log('Load Random Recipe!')
    },
  },
  computed: {
    formattedTitle() {
      let msg = this.title.split(' ')
      msg = msg.map((word) => {
        return word[0].toUpperCase() + word.substring(1)
      })
      return msg.join(' ')
    },
  },
}
</script>

<style scoped>
.header {
  background-color: #e67e22;
  padding: 20px 5%;
  margin: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo img {
  height: 100%;
  margin-right: 5px;
}

.logo h2 {
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 5px;
}
</style>
