<template>
  <div id="app">
    <div v-if="!loged" id="connect">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <button @click="connect" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="fa fa-trello" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="loged" class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">Parcerias Jardim</span>
          <div class="mdl-layout-spacer"></div>
          <!-- <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <i class="material-icons">more_vert</i>
          </button>
          <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
            <li class="mdl-menu__item">About</li>
            <li class="mdl-menu__item">Contact</li>
            <li class="mdl-menu__item">Legal information</li>
          </ul> -->
        </div>
      </header>
      <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header class="demo-drawer-header">
          <span class="mdl-chip mdl-chip--contact">
            <img :src="user_img" class="mdl-chip__contact">
            
            <span class="mdl-chip__text">{{user_name}}</span>
              
          </span>
          <!-- <img :src="user_img" class="demo-avatar"> -->
        </header>
        <div v-if="view !== ''" :is="'drawer' + view" :team="team" :parcerias="parcerias" :user_id="user_id" :parts="parts"></div>
      </div>

      <transition name="fade">
        <router-view ref="view" :parcerias="parcerias" :user_id="user_id" v-on:parts-ok="partsOk"></router-view>
      </transition>

    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import md5 from 'blueimp-md5'

import Drawerhome from './components/drawer-home.vue'
import Drawerparceria from './components/drawer-parceria.vue'

export default {
  name: 'app',
  
  data () {
    return {
      team: '580186d32c444276d6bc8b72',
      loged: false,
      view: '',
      parts: [],
      parcerias: [],
      user_id: null,
      user_name: null,
      user_email: null,
      user_img: ''
    }
  },

  watch: {
    '$route' (to, from) {
      if (to.params.id) {
        this.view = 'parceria'
      } else {
        this.view = 'home'
      }
    }
  },

  methods: {
    connect () {
      let opt = {
        type: "popup",
        name: "parcerias",
        persist: false,
        scope:  { read: true, write: true, account: true },
        expiration: "1hour",
        success: () => {
          Trello.get('/members/me', (data) => {
            let isOrg = _.find(data.idOrganizations, (id) => {
              return id === this.team
            })
            if (isOrg !== undefined) {
              this.loged = true
              this.user_id = data.id
              this.user_email = data.email
              this.user_img = "https://www.gravatar.com/avatar/"+md5(data.email)+"?s=250"
              this.user_name = data.fullName
              Trello.get(`/organizations/${this.team}/boards`, (data) => {
                for (var i = 0; i < data.length; i++) {
                  if (_.findWhere(data[i].memberships, {idMember: this.user_id}) !== undefined) {
                    let obj = {
                      name: data[i].name,
                      id: data[i].id,
                      url: data[i].url,
                      members: data[i].memberships.length
                    }
                    this.parcerias.push(obj)
                  }
                  
                }
              })
            }
          })
        }
      }
      Trello.authorize(opt)
    },
    partsOk () {
      this.parts = this.$refs.view.parts
    }
  },

  created: function () {
    this.$nextTick( () => {
      if (this.$route.path === '/') {
        this.view = 'home'
      } else {
        this.view = 'parceria'
      }
      
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Drawerparceria,
    Drawerhome
  }
}
</script>
<style lang="scss">
#connect {
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  .mdl-button--fab {
    margin-left: 49%;
    margin-top: 20%;
  }
}
.demo-drawer-header {
  height: 65px;
  .demo-avatar {
    position: absolute;
    top: 8px;
  }
}
</style>