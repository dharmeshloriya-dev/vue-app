<template>
  <div id="app">
    <siteHeader v-if="loggedIn"></siteHeader>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import siteHeader from './components/header';
import { mapGetters } from 'vuex';

export default {
  components: {
    siteHeader
  },
  computed: {
    ...mapGetters('login', ['loggedIn'])
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
button {
  a {
    color: #fff;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
