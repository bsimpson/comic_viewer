<template>
  <div>
    <div class="row mb-5">
      <div class="col text-center">
        <h1>{{ feed.title }}</h1>
        <strong>{{ feed.description }}</strong>
      </div>
    </div>

    <div class="row">
      <button
              class="col-1 btn"
              :disabled="index <= 0"
              v-on:click.stop="index -= 1"
      >
        &lt;
      </button>

      <div class="col"
           v-if="loading">
        <div class="text-center">Loading...</div>
      </div>

      <div class="col"
              v-if="!loading"
              v-html="item && item.content"
      >
      </div>

      <button class="col-1 btn"
              :disabled="index >= (feed.items.length - 1)"
              v-on:click.stop="index += 1">
        &gt;
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Comic',
  props: {
    feed: Object,
  },
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    item () {
      return this.feed.items[this.index];
    },
    loading() {
      return Object.keys(this.feed.items).length < 1;
    }
  },
  mounted() {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode == 37) {
        this.index = Math.max(0, this.index - 1);
      }

      if (evt.keyCode == 39) {
        this.index = Math.min(this.feed.items.length - 1, this.index + 1);
      }
    });
  },
  watch: {
    feed(_) {
      this.index = 0;
    }
  },
}
</script>

<style scoped>

</style>
