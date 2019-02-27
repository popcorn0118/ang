<template>
  <div class="">
   <Nav />
  <router-view />
  </div>
</template>

<script>
import Nav from '@C/Nav'
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  methods: {
   
  },
  mounted() {
    
  },
  components: {
    Nav
  }
}
</script>


