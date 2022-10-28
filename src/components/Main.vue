<template>
    <main>
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