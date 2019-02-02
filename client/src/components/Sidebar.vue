<template>
  <div class="nav flex-column nav-pills bg-dark" role="tablist">
    <div class="text-light p-2"
      v-if="loading">Loading...
    </div>
    <a href="#"
       :key="key"
       v-for="key in Object.keys(feeds)"
       v-on:click="handleNav(key)"
       :class="{ active: isActive(key) }"
       class="nav-link text-light" data-toggle="pill" role="tab">
      {{ feeds[key].title }}
    </a>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    feeds: {},
  },
  data () {
    return {
      activeTab: null,
    }
  },
  methods: {
    handleNav(item) {
      this.activeTab = item;
      this.$emit('focusComic', this.activeTab);
    },
    isActive(item) {
      return this.activeTab === item;
    }
  },
  watch: {
    feeds(val) {
      this.activeTab = Object.keys(val)[0];
    }
  },
  computed: {
    loading() {
      return Object.keys(this.feeds).length < 1;
    }
  },
}
</script>

<style scoped>

</style>
