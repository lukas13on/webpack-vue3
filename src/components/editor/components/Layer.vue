<template>
  <div :class="accordionItemClass(content)">
    <h2 :class="accordionHeaderClass(content)">
      <button :class="accordionButtonClass(content)" @click="collapseContent">
        <span>{{ contentLabel(content) }}</span>
        <span class="emmet">
          <span class="tag">{{ computedEmmetTag(content) }}</span>
          <span class="id">{{ computedEmmetId(content) }}</span>
          <span class="class">{{ computedEmmetClass(content) }}</span>
        </span>
      </button>
    </h2>
    <div :class="accordionCollapseClass(content)">
      <div class="px-4 py-2 action-content">
        <div class="form-group">
          <div class="form-group row">
            <div class="col my-auto ps-0">
              <input ref="input" type="text" class="form-control form-control-sm" v-model="content.label"
                @click="handleButtonClick(content)" @keyup="sentEditorContent" />
            </div>
            <div class="col-auto my-auto pe-0 ps-0">
              <!--
              <button class="btn btn-info text-white me-2" @click="handleButtonClick(content, collapse)">
                <i class="fa fa-edit"></i>
              </button>
              -->
              <button class="btn btn-sm btn-success me-2" @click="copyLayer" title="Copiar camada">
                <i class="fa fa-copy"></i>
              </button>
              <button class="btn btn-sm btn-dark me-2" @click="pasteLayer" title="Colar">
                <i class="fa fa-paste"></i>
              </button>
              <button class="btn btn-sm btn-secondary me-2" title="Duplicar camada" @click="cloneLayer(content)">
                <i class="fa fa-clone"></i>
              </button>
              <button class="btn btn-sm btn-danger me-2" @click="deleteLayer" title="Apagar camada">
                <i class="fa fa-times"></i>
              </button>
              <button class="btn btn-sm btn-primary" @click="addNewLayer" title="Adicionar camada">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div :class="accordionBodyClass(content)" v-if="content.content">
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
      label: ''
    };
  },
  computed: {

  },
  methods: {
    accordionBodyClass: function (content) {
      var standard = 'accordion-body';
      if (content.content.length > 0) {
        standard += ' has-content';
      } else {
        standard += ' no-content';
      }
      if (content.active) {
        standard += ' active';
      }
      return this.collapse === true ? standard : standard + ' collapsed';
    },
    computedEmmetTag: function (content) {
      return content.tag.length > 0 ? content.tag : 'div';
    },
    computedEmmetId: function (content) {
      return content.attribute.id.length > 0 ? '#' + content.attribute.id : '';
    },
    computedEmmetClass: function (content) {
      return content.attribute.class.length > 0 ? '.' + content.attribute.class : '';
    },
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
      this.collapse = this.collapse ? false : true;
      if (this.collapse) {
        this.$emitter.emit('sent-active-content', { id: this.content.uuid });
        this.$emitter.emit('sent-attributes-content', this.content);
        this.focusLabelInput();
      } else {
        // remove o active de todos
        this.$emitter.emit('sent-unactive-content', {});
        //this.$emitter.emit('sent-attributes-content', {});
      }
    },
    focusLabelInput: function () {
      var self = this;
      setTimeout(function () {
        self.$refs.input.focus();
      }, 50);
    },
    accordionButtonClass: function (content) {
      var standard = 'accordion-button';
      if (content.active) {
        standard += ' active';
      }
      return this.collapse === true ? standard : standard + ' collapsed';
    },
    accordionHeaderClass: function (content) {
      var standard = 'accordion-header';
      if (content.active) {
        standard += ' active';
      }
      return this.collapse === true ? standard : standard;
    },
    accordionItemClass: function (content) {
      var standard = 'accordion-item';
      if (content.active) {
        standard += ' active';
      }
      return this.collapse === true ? standard : standard;
    },
    accordionCollapseClass: function (content) {
      var standard = 'accordion-collapse';
      if (content.active) {
        standard += ' active';
      }
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
    pasteLayer: function () {
      navigator.clipboard.readText()
        .then(text => {
          var obj = JSON.parse(text);
          obj.uuid = uuidv4();
          obj.active = false;
          this.content.content.push(obj);
          this.sentEditorContent();
          //this.clipboard = text;
          console.log('Pasted content: ', text, obj);
        })
        .catch(err => {
          //this.clipboard = '';
          console.error('Failed to read clipboard contents: ', err);
        });
    },
    cloneLayer: function (content) {
      this.$emitter.emit('sent-clone-content', { content: content, id: this.content.parent });
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