<template>
  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-grid demo-content">
      <div v-html="html" class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col" style="padding: 20px;">
        {{html}}
      </div>
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
                desc: data[i].desc
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

<style>

</style>
