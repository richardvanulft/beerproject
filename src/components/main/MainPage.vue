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
</script>
<style>
@import '../../assets/css/style.scss';
</style>
