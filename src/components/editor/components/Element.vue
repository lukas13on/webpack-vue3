<template>
  <div class="element" :is="computedTag(content)" :id="computedId(content)" :class="computedClass(content)" :style="computedStyle(content)">
    {{content.text}}
    <template v-if="content.content.length">
      <Element v-for="(content, index) in content.content" :key="index" :is="computedTag(content)" :content="content"
        :class="computedClass(content)" :id="computedId(content)" :style="computedStyle(content)">
      </Element>
    </template>
  </div>
</template>
  
<script>
import elementStyleAttrs from '../../../app/extract/elementStyleAttrs.js';

export default {
  name: "Element",
  props: ["content"],
  data() {
    return {};
  },
  methods: {
    jsonData: function (a) {
      return JSON.stringify(a)
    },
    computedStyle: function (content) {

      if (content.style === undefined) {
        return {};
      }

      const standard = elementStyleAttrs();
      const styles = {};
      var total = Object.keys(content.style).length;
      var processed = 0;
      var ignored = 0;
      var ignoreds = [];

      for (var attribute in content.style) {
        if (standard.indexOf(attribute) !== -1) {
          styles[attribute] = content.style[attribute];
          processed++;
        } else {
          ignoreds.push(attribute);
          console.warn('Ignored incompatible style attribute: ' + attribute);
        }
      }

      ignored = total - processed;

      return styles;
    },
    computedClass: function (content) {
      return content.class ? this.class : false;
    },
    computedId: function (content) {
      return content.id ? this.id : false;
    },
    computedTag: function (content) {
      return content.tag ? this.tag : 'div';
    }
  },
  components: {
    Element: import("./Element.vue"),
  },
  created() {
    var that = this;
    console.log(that);
    console.log(this.content.id);
  },
};
</script>
<style>
.element {
  padding: 20px;
  margin: 5px;
  border: 1px solid #ff0000;
}
</style>