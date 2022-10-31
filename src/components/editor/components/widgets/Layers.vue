<template>
    <div class="widget-layers">
        <h3>Camadas</h3>
        <ul class="layers">
            <Layer v-for="(value, key, index) in list" :key="index" :content="value">
            </Layer>
        </ul>
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
            },
            {
                content: [
                    {
                        content: [],
                        html: "Text 2",
                        id: 4,
                    },
                ],
                html: "Level 2",
                id: 3,
            },
        ],
        html: "Level 1",
        id: 1,
    },
    {
        content: [
            {
                content: [],
                html: "Text 1",
                id: 2,
            },
            {
                content: [
                    {
                        content: [],
                        html: "Text 2",
                        id: 4,
                    },
                ],
                html: "Level 2",
                id: 3,
            },
        ],
        html: "Level 1",
        id: 1,
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