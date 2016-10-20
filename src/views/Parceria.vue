<template>
  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-grid demo-content">
      <div v-html="html" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col" style="padding: 20px;">
        {{html}}
      </div>
    </div>
    <div v-if="myCard === user_id" class="insert">
      <button id="decision" class="decision mdl-color--cyan-500 mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
        <i class="material-icons">gavel</i>
      </button>
      <div class="mdl-tooltip" for="decision">
        Adicionar Tomada de Decisão
      </div>
      <button id="map" class="map mdl-color--amber-500 mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
        <i class="material-icons">camera</i>
      </button>
      <div class="mdl-tooltip" for="map">
        Adicionar Mapeamento 4D
      </div>
      <button id="user" class="user mdl-color--green-500 mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
        <i class="material-icons">person_add</i>
      </button>
      <div class="mdl-tooltip" for="user">
        Adicionar Responsavel
      </div>
      <button class="primary mdl-color--purple-500 mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
    </div>
  </main>
</template>

<script>
import _ from 'underscore'
import marked from 'marked'

export default {
  name: 'parceria',

  props: {
    user_id: String,
    parcerias: Array
  },

  data () {
    return {
      html: '',
      index: 0,
      parts: []
    }
  },

  computed: {
    myCard: function () {
      return _.find(this.parts[this.index].resp, (id) => {
        return id === this.user_id
      })
    }
  },

  watch: {
    '$route' (to, from) {
      if (to.params.part) {
        this.index = parseInt(to.params.part)
        this.html = marked(this.parts[this.index].desc)
      }
    }
  },

  methods: {
    
  },

  created: function () {
    this.$nextTick( () => {
      Trello.get(`/boards/${this.$route.params.id}/cards`, (data) => {
        let semente = _.findWhere(data, {name: '{SEMENTE}'})
        Trello.get(`/lists/${semente.idList}/cards`, (data) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].name !== '{SEMENTE}') {
              let obj = {
                name: data[i].name,
                id: data[i].id,
                desc: data[i].desc,
                resp: data[i].idMembers
              }
              this.parts.push(obj)
            }
          }
          this.html = marked(this.parts[this.index].desc)
          this.$emit('parts-ok')
        })
      })
    })
  },

  components: {
    
  }
}
</script>

<style lang="scss">
.insert {
  transition: height .3s;
  position: fixed;
  bottom: 15px;
  right: 50px;
  height: 18px;
  z-index: 5;
  width: 56px;
  &:hover {
    height: 250px;
  }
  .primary {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .user {
    position: absolute;
    right: 8px;
    bottom: 28%;
  }
  .map {
    position: absolute;
    right: 8px;
    bottom: 50%;
  }
  .decision {
    position: absolute;
    right: 8px;
    bottom: 72%;
  }
}

</style>
