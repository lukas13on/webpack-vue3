<template>
  <template v-if="content.tag === 'input'">
    <input class="element" @click="handleButtonClick($event, content)" :is="computedTag(content)" :id="computedId(content)" :class="computedClass(content)" :style="computedStyle(content)"/>
  </template>
  <template v-if="content.tag === 'img'">
    <img class="element" @click="handleButtonClick($event, content)" :is="computedTag(content)" :id="computedId(content)" :class="computedClass(content)" :style="computedStyle(content)" :alt="computedAlt(content)" :src="computedSrc(content)"/>
  </template>
  <template v-else>
    <div class="element" @click="handleButtonClick($event, content)" :is="computedTag(content)" :id="computedId(content)" :class="computedClass(content)" :style="computedStyle(content)">
    {{computedText(content)}}
    <template v-if="content.content.length">
      <Element v-for="(content, index) in content.content" :key="index" :is="computedTag(content)" :content="content"
        :class="computedClass(content)" :id="computedId(content)" :style="computedStyle(content)">
      </Element>
    </template>
  </div>
  </template>
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
    handleButtonClick: function (event, content, collapse) {
      event.stopPropagation();
      console.log(event);
      console.log('sent-attributes-content', 'collapsed');
      this.$emitter.emit('sent-attributes-content', content);
      this.$emitter.emit('sent-active-content', { id: this.content.uuid });
    },
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
      var standard = content.attribute.class ? content.attribute.class : ''
      if (content.active) {
        standard += ' active';
      }
      return standard;
    },
    computedId: function (content) {
      return content.attribute.id ? content.attribute.id : '';
    },
    computedTag: function (content) {
      return content.tag ? content.tag : 'div';
    },
    computedText: function (content) {
      return content.text ? content.text : '';
    },
    computedAlt: function (content) { 
      return content.attribute.alt ? content.attribute.alt : '';
    },
    computedSrc: function (content) { 
      return content.attribute.src ? content.attribute.src : '';
    },
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
.element:hover, .element.active {
    outline: 2px dashed red;
}
</style>