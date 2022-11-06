<template>
    <aside class="col-3 bg-light">
        <slot></slot>
    </aside>
</template>

<script>
export default {
    data: function () {
        return {
            message: 'Olar'
        };
    }
}
</script>