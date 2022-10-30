<template>
    <div class="wrapperDivFromVueComponent">
      <div :id="'htmlForId' + content.id">
        <template v-if="content.content.length">
          <!-- <div v-html="pagecontent.html"></div> -->
          <Element
            v-for="(content, index) in content.content"
            :key="index"
            :content="content"
          ></Element>
        </template>
        <!-- <template v-else>
          <div v-html="pagecontent.html"></div>
        </template> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Element",
    props: ["content"],
    data() {
      return {};
    },
    components: {
      Element: import("./Element.vue"),
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