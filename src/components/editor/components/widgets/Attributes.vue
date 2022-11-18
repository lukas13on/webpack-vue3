<template>
    <h5 class="text-primary fw-bold">Atributos</h5>
    <div v-if="content.uuid" class="card">
        <div class="card-body">
            <h6 class="text-secondary fw-bold">Básico</h6>
            <div class="form-group" v-if="content.tag !== 'input' && content.tag !== 'img'">
                <label>Texto (InnerText)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.text"
                    placeholder="Texto do elemento" />
            </div>
            <div class="form-group" v-if="content.tag === 'img'">
                <label>Imagem (Src)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.attribute.src"
                    placeholder="URL da imagem" />
            </div>
            <div class="form-group" v-if="content.tag === 'img'">
                <label>Titulo alternativo (Alt)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.attribute.alt"
                    placeholder="URL da imagem" />
            </div>
            <hr class="mb-1"/>
            <h6 class="text-secondary fw-bold">Avançado</h6>
            <div class="form-group">
                <label>Elemento (Tag)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.tag"
                    placeholder="Nome do elemento" />
            </div>
            <div class="form-group">
                <label>Classe (Class)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.attribute.class"
                    placeholder="Nome da classe" />
            </div>
            <div class="form-group">
                <label>Identificação (Id)</label>
                <input type="text" class="form-control" @keyup="handdleContentChange" v-model="content.attribute.id"
                    placeholder="Nome da identificação" />
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
export default {
    data: function () {
        return {
            content: {
                attribute: {
                    class: '',
                    id: '',
                    tag: ''
                }
            }
        };
    },
    mounted: function () {
        this.$emitter.on('sent-attributes-content', this.receiveElementData);
    },
    methods: {
        receiveElementData: function (data) {
            this.content = data;
        },
        handdleContentChange: function () {
            console.log('sent-changed-content');
            this.$emitter.emit('sent-changed-content', { content: this.content, id: this.content.uuid });
        }
    }
};
</script>

<style scoped>
label {
    font-weight: bold;;
    display: block;
    width: 100%;
}
</style>