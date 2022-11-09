<template>
    <h3>Estilos</h3>
    <div v-if="content.uuid" class="card">
        <div class="card-body">
            <h4>Adicionar estilo</h4>
            <div class="row">
                <div class="form-group col-auto">
                    <select class="form-control" v-model="add.valueId" @change="changedValueId(add.valueId)">
                        <option disabled :value="null">Selecione uma opção</option>
                        <option v-for="(value, index) in add.valueIds" v-bind:value="value">{{ value }}</option>
                    </select>
                </div>
                <div class="col">
                    <input v-if="add.color" type="color" class="form-control" v-model="add.value" />
                    <input v-else class="form-control" type="text" v-model="add.value" />
                </div>
                <div class="form-group col-auto">
                    <button class="btn btn-primary" @click="adicionar">Adicionar</button>
                </div>
            </div>
            <h4>Estilos adicionados</h4>
            <div class="row">
                <div class="form-group col-12" v-for="(value, key, index) in content.style" :key="index"
                    v-show="showAttribute(key)">
                    <label>{{ key }}</label>
                    <input v-if="attributeColor(key)" type="color" class="form-control" v-model="content.style[key]"
                        :placeholder="value" />
                    <input v-else type="text" class="form-control" v-model="content.style[key]" :placeholder="value" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="card">
        <div class="card-body">
            <p>
                <small>Selecione uma camada</small>
            </p>
        </div>
    </div>
</template>

<script>
import elementStyleAttrs from '../../../../app/extract/elementStyleAttrs';

export default {
    data: function () {
        return {
            content: {
                style: null,
                collapse: false
            },
            add: {
                valueIds: elementStyleAttrs(),
                color: false,
                valueId: null,
                value: null
            }
        };
    },
    mounted: function () {
        var that = this;
        console.log(that);
        this.$emitter.on('sent-attributes-content', this.receiveElementData);
        console.log('elementStyleAttrs', elementStyleAttrs());
    },
    methods: {
        adicionar: function () {
            var valueId = this.add.valueId;
            var value = this.add.value;
            if (typeof this.content.style !== 'object') {
                this.content.style = {};
            }
            var actual = this.content.style[valueId];
            this.content.style[valueId] = value;
            this.handdleContentChange();
            console.log(valueId, value, actual)
        },
        handdleContentChange: function () {
            console.log('sent-changed-content');
            this.$emitter.emit('sent-changed-content', this.content);
        },
        keyup: function (val) {
            console.log(val)
        },
        testar: function (a) {
            console.dir(a);
        },
        test: function (key) {
            var value = this.content.style[key];
            //console.log(value);
            return value;
        },
        showAttribute: function (key) {
            //console.log(key);
            var value = this.content.style[key];
            //console.log(value);
            if (this.content.style !== undefined && this.content.style[key] !== null) {
                return true;
            } else {
                return false;
            }
        },
        attributeColor: function (key) {
            if (key.toLowerCase().indexOf('color') !== -1) {
                return true;
            } else {
                return false;
            }
        },
        changedValueId: function (valueId) {
            if (this.attributeColor(valueId)) {
                this.add.color = true;
            } else {
                this.add.color = false;
            }
        },
        receiveElementData: function (data) {
            this.content = data;
        }
    }
};
</script>