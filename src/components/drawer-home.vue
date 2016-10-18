<template>
  <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
    <a v-for="t in tarefas" class="mdl-navigation__link" :href="t.url" target="_blank"><i class="fa fa-trello" aria-hidden="true"></i> #{{t.name}}</a>
    <div class="mdl-layout-spacer"></div></a>
  </nav>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'drawer-home',

  props: {
    parcerias: Array,
    user_id: String,
    team: String
  },

  watch: {
    parcerias: function (val, oldVal) {
      for (var i = 0; i < val.length; i++) {
        Trello.get(`/boards/${val[i].id}/cards`, (data) => {
          for (var o = 0; o < data.length; o++) {
            let tarefa = _.find(data[o].idMembers, (id) => { return id === this.user_id; })
            if (tarefa !== undefined) {
              let obj = {
                name: data[o].name,
                id: data[o].id,
                url: data[o].url
              }
              this.tarefas.push(obj)
            }
          }
        })
      }
    }
  },

  data () {
    return {
      tarefas: []
    }
  },

  created: function () {
    this.$nextTick( () => {
      for (var i = 0; i < this.parcerias.length; i++) {
        Trello.get(`/boards/${this.parcerias[i].id}/cards`, (data) => {
          for (var o = 0; o < data.length; o++) {
            let tarefa = _.find(data[o].idMembers, (id) => { return id === this.user_id; })
            if (tarefa !== undefined) {
              let obj = {
                name: data[o].name,
                id: data[o].id,
                url: data[o].url
              }
              this.tarefas.push(obj)
            }
          }
        })
      }
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },
}
</script>

<style lang="scss">

</style>
