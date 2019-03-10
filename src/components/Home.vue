<template>
  <div class="">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Nav from '@C/Nav'
import Footer from '@C/Footer'
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
    Nav,
    Footer
  }
}
</script>


