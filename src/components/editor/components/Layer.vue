<template>
  <div class="accordion-item mb-1">
    <h2 class="accordion-header">
      <button :class="accordionButtonClass" @click="handleButtonClick(content, collapse)">{{ content.text }}</button>
    </h2>
    <div :class="accordionCollapseClass">
      <div class="accordion-body">
        <template v-if="content.content.length">
          <Layer v-for="(content, index) in content.content" :key="index" :content="content">
          </Layer>
        </template>
        <template v-else>
          <button class="btn btn-block btn-light w-100">{{ content.text }}</button>
        </template>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'Layer',
  props: ['content'],
  data() {
    return {
      collapse:false
    };
  },
  methods: {
    handleButtonClick: function (content, collapse) {
      if (!collapse) {
        console.log('sent-attributes-content', 'collapsed');
        this.$emitter.emit('sent-attributes-content', content);
      } else {
        console.log('sent-attributes-content','collapse');
        this.$emitter.emit('sent-attributes-content', {});
      }
      this.collapseContent();
    },
    collapseContent: function () {
      this.collapse = this.collapse ? false : true;
    }
  },
  computed: {
    accordionCollapseClass: function () {
      var that = this;
      var standard = 'accordion-collapse';
      return this.collapse === true ? standard + ' show' : standard + ' collapse';
    },
    accordionButtonClass: function () {
      var that = this;
      var standard = 'accordion-button';
      return this.collapse === true ? standard : standard + ' collapsed';
    }
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