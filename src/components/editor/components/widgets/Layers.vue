<template>
    <h2>Camadas</h2>
    <div class="card">
        <div class="card-body">
            <div class="form-group">
                <div class="form-group row">
                    <div class="col my-auto">
                        <label><b>Camada principal</b></label>
                    </div>
                    <div class="col-auto my-auto">
                        <button class="btn btn-sm btn-warning me-2" @click="pasteLayer">
                            <i class="fa fa-paste"></i>
                        </button>
                        <button class="btn btn-sm btn-dark" @click="addNewLayer">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="accordion">
        <Layer v-for="(value, key, index) in content" :key="index" :content="value">
        </Layer>
    </div>
</template>

<script>

import { v4 as uuidv4 } from 'uuid';
import Widget from '../Widget.vue';
import Layer from '../Layer.vue';

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
        addNewLayer: function () {
            this.content.push({
                label: '',
                text: '',
                tag: '',
                attribute: {
                    id: "",
                    class: "",
                },
                content: [],
                style: {},
                uuid: uuidv4()
            });
            this.sentEditorContent();
        },
        receiveEditorContent: function (data) {
            this.content = data;
            console.log(data);
        },
        pasteLayer: function () {
            navigator.clipboard.readText()
                .then(text => {
                    var obj = JSON.parse(text);
                    obj.uuid = uuidv4();
                    obj.active = false;
                    this.content.push(obj);
                    this.sentEditorContent();
                    //this.clipboard = text;
                    console.log('Pasted content: ', text, obj);
                })
                .catch(err => {
                    //this.clipboard = '';
                    console.error('Failed to read clipboard contents: ', err);
                });
        },
        sentEditorContent: function () {
            this.$emitter.emit('sent-editor-content', this.content);
            console.log('emited');
        }
    },
    components: {
        Widget: Widget,
        Layer: Layer
    }
};
</script>

<style scoped>
label {
    display: block;
    width: 100%;
}
</style>