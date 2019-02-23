<template>
  <main>
    <header class="fixed-top">
      <div class="row">
        <div class="col">
          <h1 class="text-center bg-dark text-light p-3 border-bottom border-light d-none d-md-block">
            Web Comic Viewer
          </h1>
          <h5 class="bg-dark text-light p-1 border-bottom border-light d-block d-md-none">
            <Sidebar
                    v-on:focusComic="handleFocus"
                    :feeds="feeds"
            >
              <div class="row">
                <span class="text-light text-left col-1">
                  ☰
                </span>
                <span class="col-10 text-center">
                  Web Comic Viewer
                </span>

              </div>

            </Sidebar>
          </h5>
        </div>
      </div>
    </header>

    <noscript>
      <strong>We're sorry but Comic Viewer doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

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
  </main>
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
