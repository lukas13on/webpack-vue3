<template>
    <h5 class="text-primary fw-bold">Camadas</h5>
    <div class="card mb-2">
        <div class="card-body">
            <div class="form-group">
                <div class="form-group row">
                    <div class="col my-auto">
                        <label>Documento</label>
                    </div>
                    <div class="col-auto my-auto">
                        <button class="btn btn-sm btn-dark me-2" @click="pasteLayer" title="Colar">
                            <i class="fa fa-paste"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" @click="addNewLayer" title="Adicionar camada">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <div class="accordion" v-if="content.length > 0">
                <Layer v-for="(value, key, index) in content" :key="index" :content="value">
                </Layer>
            </div>
            <div v-else>
                <p><small>Nenhuma camada</small></p>
            </div>
        </div>
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