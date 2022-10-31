<template>
    <template v-if="content.content.length">
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
    </template>
</template>
  
<script>
export default {
  name: "Layer",
  props: ["content"],
  data() {
    return {};
  },
  components: {
    Layer: import("./Layer.vue"),
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