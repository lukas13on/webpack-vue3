<template>
    <h2>Camadas</h2>
    <div class="accordion">
        <Layer v-for="(value, key, index) in content" :key="index" :content="value">
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
                text: "Text 1",
                id: 2,
                style: {
                    backgroundColor: "green"
                }
            },
            {
                content: [
                    {
                        content: [],
                        text: "Text 2",
                        id: 4,
                        style: {
                    backgroundColor: "yellow"
                }
                    },
                ],
                text: "Level 2",
                id: 3,
                style: {
                    backgroundColor: "blue"
                }
            },
        ],
        text: "Level 1",
        id: 1,
        style: {
            backgroundColor: "red"
        }
    },
    {
        content: [
            {
                content: [],
                text: "Text 1",
                id: 2,
            },
            {
                content: [
                    {
                        content: [],
                        text: "Text 2",
                        id: 4,
                    },
                ],
                text: "Level 2",
                id: 3,
            },
        ],
        text: "Level 1",
        id: 1,
    },
];

export default {
    data: function () {
        return {
            content: []
        };
    },
    mounted: function () { 
        this.$emitter.on('sent-editor-content', this.receiveEditorContent);
    },
    methods: {
        receiveEditorContent: function (data) {
            this.content = data;
            console.log(data);
        },  
    },
    components: {
        Widget: Widget,
        Layer: Layer
    }
};
</script>