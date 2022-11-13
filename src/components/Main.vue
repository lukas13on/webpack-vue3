<template>
    <main class="col-9 pt-2">
        <slot></slot>
    </main>
</template>

<script>
export default {
    data: function () {
        return {
            message: 'Olar'
        };
    },
    name: "Main"
}
</script>