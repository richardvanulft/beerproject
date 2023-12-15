<template>
    <div class="container">
<h1>Welcome to <br> unknown beer company!</h1>
      <p>THE place you want to be to taste your beers!</p>
</div>
</template>
<script>
import axios from 'axios';
  
  axios.get('http://localhost:3000/api/check-login')
  .then(response => {
    if (response.data.isLoggedIn) {
     
    } else {

    }
  })
  .catch(error => {
    console.log(error);
  });

export default {

name: 'HomePage',
  metaInfo: {
    title: 'Home - unknownbeercompany',
    meta: [
      {
        name: 'description',
        content: 'Welcome to Unknown Beer Company, the place you want to be to taste your beers!'
      },
      {
        property: 'og:title',
        content: 'Home - unknownbeercompany.com'
      },
      {
        property: 'og:description',
        content: 'Welcome to Unknown Beer Company, the place you want to be to taste your beers!'
      }
    ]
  },
}
</script>
<style lang="scss">
@import '../../assets/css/style.scss';
</style>
