<template>
  <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
    <a v-for="t in tarefas" class="mdl-navigation__link" :href="t.url" target="_blank"><i class="fa fa-trello" aria-hidden="true"></i>#{{t.name}}</a>
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

  data () {
    return {
      tarefas: []
    }
  },

  created: function () {
    console.log(this.parcerias)
    for (let i = 0; i < this.parcerias.length; i++) {
      console.log('chegou aki')
      Trello.get(`/boards/${this.parcerias[i].id}/cards`, (data) => {
        for (let i = 0; i < data.length; i++) {
          let tarefa = _.find(data[i].idMembers, (id) => { return id === this.user_id; })
          console.log(tarefa)
          if (tarefa !== undefined) {
            let obj = {
              name: data[i].name,
              id: data[i].id,
              url: data[i].url
            }
            this.tarefas.push(obj)
          }
        }
      })
    }
    this.$nextTick( () => {
      
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
