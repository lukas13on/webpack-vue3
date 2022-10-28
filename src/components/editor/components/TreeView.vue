<template>
  <tree-item :node="data"></tree-item>
</template>
  
<script>
import TreeItem from "./TreeItem.vue";

export default {
  props: ['data'],
  components: {
    TreeItem
  }
};
</script>