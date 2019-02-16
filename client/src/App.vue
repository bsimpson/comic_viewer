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
import { ajax } from 'rxjs/ajax';
import { map, flatMap, concatMap } from 'rxjs/operators';

export default {
  name: 'app',
  components: {
    Comic,
    Sidebar,
  },
  data: () => {
    return {
      feeds: {},
      focusedFeed: {
        title: '',
        items: [],
      },
      manifestUrl: process.env.VUE_APP_MANIFEST_URL,
      feedUrl: process.env.VUE_APP_FEED_URL,
    }
  },
  mounted () {
    ajax.getJSON(this.manifestUrl)
      .pipe(
        flatMap(comics => comics),
        concatMap(comic => {
          const url = this.feedUrl.slice().replace(/%NAME%/, comic);
          return ajax.getJSON(url).pipe(
            map(data => {
              return { comic, data };
            }),
          );
        }),
      ).subscribe(next => {
        const {comic, data} = next;
        const feed = {};
        feed[comic] = data;
        this.feeds = Object.assign({}, this.feeds, feed);

        if(this.focusedFeed.items.length <= 0) {
          this.focusedFeed = this.feeds[comic];
        }
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
