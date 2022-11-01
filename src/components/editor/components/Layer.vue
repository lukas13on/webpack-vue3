<template>
  <div class="accordion-item mb-1">
    <h2 class="accordion-header">
      <button :class="accordionButtonClass" @click="collapseContent">{{ content.html }}</button>
    </h2>
    <div :class="accordionCollapseClass">
      <div class="accordion-body">
        <template v-if="content.content.length">
          <Layer v-for="(content, index) in content.content" :key="index" :content="content">
          </Layer>
        </template>
        <template v-else>
          <button class="btn btn-block btn-light w-100">{{ content.html }}</button>
        </template>
      </div>
    </div>
  </div>
  <!-- <template v-if="content.content.length">
      <li>
        <span>{{content.html}}</span>
        <ul>
          <Layer v-for="(content, index) in content.content" :key="index" :content="content">
          </Layer>
        </ul>
      </li>
    </template>
    <template v-else>
      <li><span>{{content.html}}</span></li>
    </template> -->
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
    collapseContent: function () {
      this.collapse = this.collapse ? false : true;
    }
  },
  computed: {
    accordionCollapseClass: function () {
      var that = this;
      var standard = 'accordion-collapse';
      console.log(that.content)
      return this.collapse === true ? standard + ' show' : standard + ' collapse';
    },
    accordionButtonClass: function () {
      var that = this;
      var standard = 'accordion-button';
      console.log(that.content)
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