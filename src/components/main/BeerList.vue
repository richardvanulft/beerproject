<template>
    <div class="container">
      <v-table class="beers">
        <thead>
        <tr class="trbeer">
          <th><p style="font-size: 150%; margin-right: 30px;">Name</p></th>
          <th class="brewer"><p style="font-size: 150%; margin-right: 30px;">Brewer</p></th>
          <th class="info"><p style="font-size: 150%; margin-right: 30px;">Info</p></th>
          <th class="price"><p style="font-size: 150%; margin-right: 30px;">Price</p></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="beer in paginatedBeers" :key="beer.id" class="beer-row">
      <td class="tdbeer">{{ beer.name }}</td>
          <td class="tdbeer brewer">{{ beer.brewer }}</td>
          <td class="tdbeer info">
            <router-link :to="{name: 'BeerInfo', params: { id: beer.id } }">
              <button style="font-size: 100%;">Info</button>
            </router-link>
          </td>
          <td class="tdbeer price">{{ beer.purchase_price }}</td>
        </tr>
      </tbody>
        <div class="pagination">
          <button @click="currentPage = 1" :disabled="currentPage === 1">First</button>
          <button @click="currentPage--" :disabled="currentPage === 1">Back</button>
          <button
              v-for="page in pageRange"
              :key="page"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
          <button @click="currentPage = totalPages" :disabled="currentPage === totalPages">Last</button>
        </div>
      </v-table>
    </div>
</template>


<script>
export default {
  name: 'Beerlist',
  metaInfo: {
    title: 'Beerlist - Unknown Beer Company',
    meta: [
      {
        name: 'description',
        content: 'A List of all our beers that you can taste.'
      },
      {
        property: 'og:title',
        content: 'Beerlist - unknownbeercompany.com'
      },
      {
        property: 'og:description',
        content: 'A List of all our beers that you can taste.'
      }
    ]
  },
  data() {
    return {
      beers: [],
      currentPage: 1,
    };
  },
  computed: {
    //vernieuwd het alleen bij refresh, normale gebruikers zullen niet op computer ineens de website in de maat van telefoon bekijken
    perPage() {
      return window.innerWidth <= 480 ? 3 : 6;
    },
    totalPages() {
      return Math.ceil(this.beers.length / this.perPage);
    },
    paginatedBeers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.beers.slice(start, end);
    },
    pageRange() {
      const start = Math.max(this.currentPage - 2, 1);
      const end = Math.min(start + 2, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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

<style lang="scss">
@import '../../assets/css/style.scss';
</style>
