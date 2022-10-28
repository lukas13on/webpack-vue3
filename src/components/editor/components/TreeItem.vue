<template>
  <div v-if="node.children && node.children.length">
    <Element v-for="(child , index) in node.children" :node="child" :key="index">
    </Element>
  </div>
</template>
  
<script>
import Element from '../components/Element.vue';
export default {
  props: ['node'],
  components: {
    Element: Element
  }
};
</script>