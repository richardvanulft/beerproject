<template>
  <div >
    <Navbar />
    <div class="content-wrapper">
      <LeftSidebar />
      <router-view />
      <RightSidebar />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';


export default {
  name: 'App',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
};
</script>

<style lang="scss">
@import './assets/css/style.scss';
</style>
