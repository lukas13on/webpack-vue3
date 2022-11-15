<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button :class="accordionButtonClass(content)" @click="collapseContent">{{ contentLabel(content) }}</button>
    </h2>
    <div :class="accordionCollapseClass(content)">
      <div class="px-4 py-2">
        <div class="form-group">
          <div class="form-group row">
            <div class="col my-auto">
              <input ref="input" type="text" class="form-control" v-model="content.label" @keyup="sentEditorContent" />
            </div>
            <div class="col-auto my-auto">
              <!--
              <button class="btn btn-info text-white me-2" @click="handleButtonClick(content, collapse)">
                <i class="fa fa-edit"></i>
              </button>
              -->
              <button class="btn btn-sm btn-primary me-2" @click="copyLayer">
                <i class="fa fa-copy"></i>
              </button>
              <button class="btn btn-sm btn-warning me-2 disabled">
                <i class="fa fa-paste"></i>
              </button>
              <button class="btn btn-sm btn-secondary me-2 disabled">
                <i class="fa fa-clone"></i>
              </button>
              <button class="btn btn-sm btn-danger me-2" @click="deleteLayer">
                <i class="fa fa-times"></i>
              </button>
              <button class="btn btn-sm btn-dark" @click="addNewLayer">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-body" v-if="content.content.length > 0">
        <Layer v-for="(content, index) in content.content" :key="index" :content="content">
        </Layer>
      </div>
    </div>
  </div>
</template>
  
<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Layer',
  props: ['content'],
  data() {
    return {
      collapse: false,
      label: '',
      paste: ''
    };
  },
  methods: {
    contentLabel: function (content) {
      var x = this;
      console.log(x.label, content.label);
      if (content.label === undefined || content.label === '') {
        return 'Sem nome';
      } else {
        return content.label;
      }
    },
    handleButtonClick: function (content) {
      console.log('sent-attributes-content', 'collapsed');
      this.$emitter.emit('sent-attributes-content', content);
      this.$emitter.emit('sent-active-content', { id: this.content.uuid });
    },
    collapseContent: function () {
      this.$emitter.emit('sent-active-content', { id: this.content.uuid });
      this.$emitter.emit('sent-attributes-content', this.content);
      this.collapse = this.collapse ? false : true;
      if (this.collapse) {
        this.focusLabelInput();
      }
    },
    focusLabelInput: function () {
      var self = this;
      setTimeout(function () {
        self.$refs.input.focus();
      }, 150);
    },
    accordionButtonClass: function (content) {
      var standard = 'accordion-button';
      if (content.active) {
        standard += ' active';
      }
      return this.collapse === true ? standard : standard + ' collapsed';
    },
    accordionCollapseClass: function (content) {
      var standard = 'accordion-collapse';
      return this.collapse === true ? standard + ' show' : standard + ' collapse';
    },
    addNewLayer: function () {
      var that = this;
      console.log(that)
      this.content.content.push({
        label: '',
        text: '',
        tag: '',
        attribute: {
          id: "",
          class: "",
        },
        content: [],
        style: {},
        uuid: uuidv4()
      });
      this.sentEditorContent();
    },
    deleteLayer: function () {
      this.$emitter.emit('sent-remove-content', { id: this.content.uuid });
      this.$emitter.emit('sent-attributes-content', {});
    },
    copyLayer: function () {
      //this.$emitter.emit('sent-copied-content', {content: this.content});
      var text = "Example text to appear on clipboard";
      var data = JSON.stringify(this.content);
      navigator.clipboard.writeText(data).then(function () {
        console.log(data);
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    },
    sentEditorContent: function () {
      this.$emitter.emit('sent-changed-content', { content: this.content, id: this.content.uuid });
    },
    receivedCopiedContent: function (data) {
      console.log('sent-copied-content');
      console.log(data);
    }
  },
  computed: {
  },
  components: {
    Layer: import('./Layer.vue'),
  },
  mounted: function () {
  },
  created() {
    console.log(this.content.id);
  },
};
</script>
<style scoped>
.accordion-button.active {
  background-color: #0d6efd;
  color: #fff;
  font-weight: bold;
}

input.form-control {
  cursor: pointer;
}
</style>