<template>
  <div id="app" class="container-fluid">
    <div class="row pt-5 mb-5 justify-content-md-center">
      <div class="col-12 col-md-4">
        <Sidebar
          v-on:focusComic="handleFocus"
          :feeds="feeds"
        ></Sidebar>
      </div>
      <div class="col-12 col-md-8">
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
    fetch('https://boiling-fortress-45509.herokuapp.com/comics.json').then((res) => {
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
  text-align: center;
  margin: 80px 0;
}
</style>
