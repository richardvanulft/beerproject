<template>
    <div class="container">
      <h1>BeerList</h1>
      <v-table class="beers">
        <thead>
        <tr class="trbeer">
          <th><p style="font-size: 150%; margin-right: 30px;">Name</p></th>
          <th><p style="font-size: 150%; margin-right: 30px;">Brewer</p></th>
          <th><p style="font-size: 150%; margin-right: 30px;">Information</p></th>
          <th><p style="font-size: 150%; margin-right: 30px;">Purchase Price</p></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="beer in paginatedBeers" :key="beer.id">
      <td class="tdbeer">{{ beer.name }}</td>
          <td class="tdbeer">{{ beer.brewer }}</td>
          <td class="tdbeer">
            <router-link :to="{name: 'BeerInfo', params: { id: beer.id } }">
              <button style="font-size: 100%;">View Details</button>
            </router-link>
          </td>
          <td class="tdbeer">{{ beer.purchase_price }}</td>
        </tr>
      </tbody>
      </v-table>
    </div>
</template>


<script>
export default {
  data() {
    return {
      beers: [],
      selectedBeerId: null,
      currentPage: 1,
      perPage: 10,
      rows: 0,
    };
  },
  computed: {
    paginatedBeers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.beers.slice(start, end);
    },
  },
  mounted() {
    this.fetchBeers();
  },
  methods: {
    async fetchBeers() {
      try {
        const response = await fetch('http://localhost:3000/ShowAllbeers');
        const data = await response.json();
        this.beers = data;
        this.rows = data.length; // Set the total number of items
      } catch (error) {
        console.error(error);
      }
    },
    setSelectedBeerId(id) {
      this.selectedBeerId = id;
      const route = `/beer/${id}`;
      this.$router.push(route);
    },
  },
};
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  background-color: #D89000;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  justify-content: center;
  height: 100%;
}

h1 {
  text-align: center;
}

.beers {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-collapse: collapse;
  width: 50%;
  color: white;
  background-color: #373737;
  border-radius: 5px;
  border-color: transparent;
  text-align: center;
}

.tdbeer {
  text-align: center;
  margin-left: 200px;
}

li {
  list-style-type: none;
  margin: 15px;
}
</style>
