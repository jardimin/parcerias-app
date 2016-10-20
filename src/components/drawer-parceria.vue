<template>
  <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
    <router-link v-for="(p, index) in parts" class="mdl-navigation__link" :to="'/parceria/' + $route.params.id + '/' + index ">
      <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">{{p.resp.length === 0 ? 'help_outline' : 'assignment'}}</i>{{p.name}}
    </router-link>
    <div class="mdl-layout-spacer"></div></a>
  </nav>
</template>

<script>
export default {
  name: 'drawer-parceria',

  props: {
    parts: Array,
    user_id: String
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
.demo-navigation {
  .mdl-navigation__link {
    &.router-link-active {
      background-color: #00BCD4;
      color: #37474F;
    }
  }
}
</style>
