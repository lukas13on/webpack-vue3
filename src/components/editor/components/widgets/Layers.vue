<template>
    <h2>Camadas</h2>
    <div class="accordion">
        <Layer v-for="(value, key, index) in list" :key="index" :content="value">
        </Layer>
    </div>
</template>

<script>
import Widget from '../Widget.vue';
import Layer from '../Layer.vue';

const list = [
    {
        content: [
            {
                content: [],
                html: "Text 1",
                id: 2,
                collapse: false
            },
            {
                content: [
                    {
                        content: [],
                        html: "Text 2",
                        id: 4,
                        collapse: false
                    },
                ],
                html: "Level 2",
                id: 3,
                collapse: false
            },
        ],
        html: "Level 1/1",
        id: 1,
        collapse: true
    },
    {
        content: [
            {
                content: [],
                html: "Text 1",
                id: 2,
                collapse: false
            },
            {
                content: [
                    {
                        content: [],
                        html: "Text 2",
                        id: 4,
                        collapse: false
                    },
                ],
                html: "Level 2",
                id: 3,
                collapse: false
            },
        ],
        html: "Level 1/2",
        id: 1,
        collapse: false
    },
];

export default {
    data: function () {
        return {
            list: list
        };
    },
    components: {
        Widget: Widget,
        Layer: Layer
    }
};
</script>