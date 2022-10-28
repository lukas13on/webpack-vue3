<template>
    <component :is="tag" :id="id" :class="class">componente teste</component>
    <p>test</p>
</template>

<script>

import { ref } from 'vue';

import elementStyleAttrs from '../../app/extract/elementStyleAttrs.js';

export default {
    props: [
        'id',
        'class', 
        'tag'
    ],
    data: function(){
        return {
        };
    },
    setup: function () {
        var style = ref(elementStyleAttrs());

        return {
            style
        };
    }
}
</script>