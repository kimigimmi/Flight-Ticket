<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");


* {
  box-sizing: border-box;   /* Style'larda border kısımları yokmuş gibi davranır. Örneğin width: 100% yapınca border da varsa border yüzünden ekrana sığmaz. border-box kullanırsak sığdırır */
}

html {
  font-family: "Roboto", sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
