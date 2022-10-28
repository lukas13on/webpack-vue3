<template>
    <TreeView :data="data">
    </TreeView>
</template>

<script>
import TreeView from './TreeView.vue'
export default {
    props: ['data'],
    components: {
        TreeView: TreeView
    }
};
</script>