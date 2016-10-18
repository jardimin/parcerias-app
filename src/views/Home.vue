<template>
  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-grid demo-content">
      <div class="demo-cards mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--no-spacing">
        <div v-for="p in parcerias" class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-cell--3-col-desktop">
          <div class="mdl-card__title mdl-card--expand mdl-color--teal-300">
            <h2 class="mdl-card__title-text">{{p.name}}</h2>
          </div>
          <div class="mdl-card__supporting-text mdl-color-text--grey-600">
            Pessoas envolvidas: {{p.members}}
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Abrir</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'home',

  props: {
    user_id: String,
    parcerias: Array
  },

  data () {
    return {
      members: 0
    }
  },

  watch: {
    '$route' (to, from) {
      
    }
  },

  methods: {
    
  },

  created: function () {
    this.$nextTick( () => {
      
    })
  },

  components: {
    
  }
}
</script>

<style>
.fade-enter-active, .fade-leave {
  transition: opacity .5s, transform .5s;
  opacity: 1;
  transform: translateX(0px);
}
.fade-leave-active, .fade-enter {
  transition: opacity .5s, transform .5s;
  opacity: 0;
}
.fade-leave-active {
  transform: translateX(20px);
}
.fade-enter {
  transform: translateX(-20px);
}
</style>
