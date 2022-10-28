<template>
    <component :is="computedTag" :id="computedId" :class="computedClass" :style="computedStyles">
        <slot></slot>
    </component>
</template>

<script>

import { ref } from 'vue';

import elementStyleAttrs from '../../../app/extract/elementStyleAttrs.js';

export default {
    props: [
        'id',
        'class',
        'tag',
        'styles'
    ],
    data: function () {
        return {
        };
    },
    computed: {
        computedStyles: function () {

            if (this.styles === undefined) { 
                return {};
            }

            const standard = elementStyleAttrs();
            const styles = {};
            var total = Object.keys(this.styles).length;
            var processed = 0;
            var ignored = 0;
            var ignoreds = [];

            for (var attribute in this.styles) {
                if (standard.indexOf(attribute) !== -1) {
                    styles[attribute] = this.styles[attribute];
                    processed++;
                } else {
                    ignoreds.push(attribute);
                    console.warn('Ignored incompatible style attribute: ' + attribute);
                }
            }

            ignored = total - processed;

            return styles;
        },
        computedClass: function () {
            return this.class ? this.class : '';
        },
        computedId: function () {
            return this.id ? this.id : '';
        },
        computedTag: function () {
            return this.tag ? this.tag : 'div';
        }
    }
}
</script>