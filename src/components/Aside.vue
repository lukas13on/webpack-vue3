<template>
    <aside class="col-3 bg-dark text-white">
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