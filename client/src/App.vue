<template>
  <div id="app" class="container">
    <div class="row pt-5 mb-5">
      <div class="col-sm-12 col-md-4 col-lg-4">
        <Sidebar
          v-on:focusComic="handleFocus"
          :feeds="feeds"
        ></Sidebar>
      </div>
      <div class="col-sm-12 col-md-8 col-lg-8">
        <Comic
                :feed="focusedFeed"
        ></Comic>
      </div>
    </div>
  </div>
</template>

<script>
import Comic from './components/Comic.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'app',
  components: {
    Comic,
    Sidebar,
  },
  data: () => {
    return {
      feeds: [],
      focusedFeed: {
        title: '',
        items: [],
      },
    }
  },
  mounted () {
    fetch('http://localhost:3000/comics.json').then((res) => {
      res.json().then((json) => {
        this.feeds = json;
        this.focusedFeed = this.feeds[Object.keys(this.feeds)[0]];
      })
    });
  },
  methods: {
    handleFocus(comic) {
      this.focusedFeed = this.feeds[comic];
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
