<template>
  <div>
    <a href="#"
       class="text-light text-left nav-link"
       @click="toggleMenu"
    >
      <slot />
    </a>
    <div class="text-light p-2"
      v-if="loading">Loading...
    </div>
    <div
      class="nav flex-column nav-pills bg-dark" role="tablist"
      v-bind:class="{ 'd-none': !showMenu, 'd-md-block': !showMenu }"
    >
      <a href="#"
         :key="key"
         v-for="key in Object.keys(feeds)"
         v-on:click="handleNav(key)"
         :class="{ active: isActive(key) }"
         class="nav-link text-light" data-toggle="pill" role="tab"
      >
        {{ feeds[key].title }}
      </a>
    </div>
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
      showMenu: false,
    }
  },
  methods: {
    handleNav(item) {
      this.activeTab = item;
      this.$emit('focusComic', this.activeTab);
      this.showMenu = false;
    },
    isActive(item) {
      return this.activeTab === item;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
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
