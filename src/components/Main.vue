<template>
    <main>
        <Element id="hmm" tag="div" class="test"></Element>
    </main>
</template>

<script>

import Element from './editor/Element.vue';

export default {
    data: function () {
        return {
            message: 'Olar'
        };
    },
    components: {
        Element:Element
    }
}
</script>