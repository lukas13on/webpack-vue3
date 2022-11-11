<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button :class="accordionButtonClass(content)" @click="collapseContent">{{ content.label }}</button>
    </h2>
    <div :class="accordionCollapseClass(content)">
      <div class="px-4 py-2">
        <div class="form-group">
          <div class="form-group row">
            <div class="col my-auto">
              <input type="text" class="form-control" v-model="content.label" />
            </div>
            <div class="col-auto my-auto">
              <button class="btn btn-info text-white me-2" @click="handleButtonClick(content, collapse)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-danger me-2" @click="deleteLayer">
                <i class="fa fa-times"></i>
              </button>
              <button class="btn btn-primary" @click="addNewLayer">
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
import fa from 'fontawesome';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Layer',
  props: ['content'],
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    handleButtonClick: function (content, collapse) {
      console.log('sent-attributes-content', 'collapsed');
      this.$emitter.emit('sent-attributes-content', content);
    },
    collapseContent: function () {
      this.collapse = this.collapse ? false : true;
    },
    accordionButtonClass: function (content) {
      var standard = 'accordion-button';
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
        label: 'Sem nome',
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
      this.$emitter.emit('sent-remove-content', this.content);
      this.$emitter.emit('sent-attributes-content', {});
    },
    sentEditorContent: function () {
      this.$emitter.emit('sent-changed-content', this.content);
    }
  },
  computed: {

  },
  components: {
    Layer: import('./Layer.vue'),
  },
  created() {
    console.log(this.content.id);
  },
};
</script>
<style>
.wrapperDivFromVueComponent {
  padding: 20px;
  margin: 5px;
  border: 1px solid #ff0000;
}
</style>

<style scoped>
.btn-light-outline {
  border-color: #dee2e6 !important;
  border-radius: 0px;
  padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);
  text-align: left;
}

.btn-light-outline.active {
  background-color: #e7f1ff;
  color: #0c63e4;
}

.btn-light-outline:focus {
  z-index: 3;
  border-color: var(--bs-accordion-btn-focus-border-color);
  outline: 0;
  box-shadow: var(--bs-accordion-btn-focus-box-shadow);
}
</style>