<template>
    <component :is="tag" :id="id" :class="class">componente teste</component>
</template>

<script>

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
        const style = ref(elementStyleAttrs());
        return {
            style
        };
    }
}
</script>