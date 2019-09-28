<template>
  <div class="body">
    <div class="nav">
      nav
    </div>
    <div class="warp">
      <div class="warp_a">
        123aaa
      </div>
      <div class="warp_b">
        <div class="warp_b--1">warp_b--1</div>
        <div class="warp_b--2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid eius veniam repellendus animi dolorem iure neque eveniet nihil. Placeat ea earum recusandae quae accusantium, pariatur quisquam. Deserunt distinctio numquam, tempore dolorem molestias, porro suscipit repudiandae totam corporis consequuntur, maiores sunt illo saepe. Architecto exercitationem pariatur dicta neque delectus, officia aspernatur, voluptatibus blanditiis quis maiores, ullam reiciendis aliquam sunt rem alias enim suscipit rerum velit maxime distinctio dolorem sint autem. Voluptatibus, ut vel non et aliquam excepturi quibusdam cum, sit recusandae labore error, magnam necessitatibus voluptas nulla laborum doloribus. Quam, cum corrupti minus error dolorum reiciendis eius at eaque ea aliquid.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit at labore quibusdam sequi placeat expedita sint deserunt maxime nesciunt vero perspiciatis dolorum, praesentium architecto mollitia ipsum eaque commodi fuga aut?
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate harum tenetur rerum dolores qui reprehenderit est iste sunt? Mollitia sed non vero voluptate beatae quia laudantium porro facere quas, asperiores iusto animi voluptates reiciendis exercitationem eligendi placeat nisi in accusantium aperiam molestiae dolorem. Ipsam sequi, facilis amet officiis deleniti perspiciatis.
        </div>
      </div>
    </div>
    <div class="menu">
      menu
    </div>
  </div>
</template>
<style lang="scss">
  body {
      margin: 0;
      padding: 0;
  }
  .body {
    background-color: #4caf50;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    .nav {
      height: 50px;
      width: 100%;
      background: #444444;
      flex-shrink: 0;
    }
    .warp {
      flex-grow: 1;
      flex-shrink: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      .warp_a {
        width: calc(100% - 20px);
        margin: 10px auto;
        border-radius: 10px;
        height: 120px;
        background-color: #FFC107;
        box-sizing: border-box;
        flex-shrink: 0;
      }
      .warp_b {
        background-color: #FFC107;
        width: calc(100% - 20px);
        height: 100%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
        .warp_b--1 {
          flex-grow: 1;
          height: 40px;
          width: 100%;
          flex-shrink: 0;
        }
        .warp_b--2 {
          width: 100%;
          background-color: green;
          overflow-y: auto;
          flex-shrink: 1;
        }
      }
      
    }
    .menu {
      flex-shrink: 0;
      width: 100%;
      height: 60px;
      background-color: #8bc34a;
    }
  }
</style>
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
}
</script>


