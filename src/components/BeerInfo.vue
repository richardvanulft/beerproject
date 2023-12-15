<template>
    <div>
      <Navbar />
      <router-view />
      <h1>BeerInfo</h1>
      <table class="beers">
          <tr class="trbeer">
            <th>ID</th>
            <td class="tdbeer">{{ beer.id }}</td>
            </tr>
            <tr class="trbeer">
            <th>Naam</th>
            <td class="tdbeer">{{ beer.name }}</td>
            </tr>
            <tr class="trbeer">
            <th>Brouwer</th>
            <td class="tdbeer">{{ beer.brewer }}</td>
            </tr>
            <tr class="trbeer">
            <th>Type</th>
            <td class="tdbeer">{{ beer.type }}</td>
            </tr>
            <tr class="trbeer">
            <th>yeast</th>
            <td class="tdbeer">{{ beer.yeast }}</td>
            </tr>
            <tr class="trbeer">
            <th>alcohol</th>
            <td class="tdbeer">{{ beer.perc }}</td>
            </tr>
            <tr class="trbeer">
            <th>purchase_price</th>
            <td class="tdbeer">{{ beer.purchase_price }}</td>
            </tr>
            <tr class="trbeer">
            <th>created_at</th>
            <td class="tdbeer">{{ beer.created_at }}</td>
            </tr>
            <tr class="trbeer">
            <th>updated_at</th>
            <td class="tdbeer">{{ beer.updated_at }}</td>
            </tr>
            <tr class="trbeer">
            <th>like count</th>
            <td class="tdbeer">{{ beer.like_count }}</td>
          </tr>
      </table>
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
    data() {
      return {
        beer: {},
      };
    },
    mounted() {
      const id = this.getIdFromURL();
      this.fetchData(id);
      console.log(id);
    },
    methods: {
      getIdFromURL() {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        return id;
        console.log(id);
      },
      fetchData(id) {
        axios
          .get(`http://localhost:3000/ShowAllbeers/${id}`) // Replace with your API URL
          .then(response => {
            console.log(response.data);
            this.beer = response.data; // Replace beer with your data property
          })
          .catch(error => {
            console.error(error);       
          });
      },
    },
  };
  </script>
  