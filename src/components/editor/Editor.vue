<template>
    <div id="editor-main">
        <Element v-for="(value, key, index) in content" :key="index" :content="value">
        </Element>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Element from '../editor/components/Element.vue';

const lista = [
    {
        content: [
        ],
        text: "Sem nome",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color:"#ffffff"
        }
    },
];

function flatten(items) {
    console.log(items);
    const flat = [];

    items.forEach(item => {
        if (Array.isArray(item)) {
            flat.push(...flatten(item));
        } else {
            item.uuid = uuidv4();
            flat.push(item);
        }
    });

    return flat;
}

function test(items) {
    var res = [];
    items.forEach(item => {
        var _item = item;
        _item.uuid = uuidv4();
        var keys = Object.keys(item);
        const index = keys.indexOf('content');
        
        keys.splice(index, 1); 
        console.log(keys, index);
        if (item.content && item.content.length > 0) { 
            _item.content = [...test(item.content)];
            res.push(_item);
        } else {
            //res.push(item);
            for (var key of keys) { 
                _item[key] = item[key];
            }
            res.push(_item);
        }
    });
    return res;
}

function fidden(items, _item) {
    console.log(items);
    const flat = [];

    items.forEach(item => {

        if (!Array.isArray(item)) {
            if (item.uuid !== _item.uuid) {
                //console.log('not located');
                flat.push(item);
            } else {
                flat.push(_item);
                //console.log('located');
            }
        } else {
            flat.push(...fidden(item));
        }


    });

    return flat;
}

export default {
    data: function () {
        return {
            content: test(lista),
        };
    },
    mounted: function () {
        this.$emitter.emit('sent-editor-content', this.content);
        this.$emitter.on('sent-editor-content', this.receivedContent);
        this.$emitter.on('sent-changed-content', this.receivedChangedContents);
    },
    methods: {
        receivedChangedContents: function (content) {
            console.log('receivedChangedContents', content);
            this.content = fidden(this.content, content);
        },
        receivedContent: function (content) {
            this.content = content;
        }
    },
    components: {
        Element: Element
    }
}
</script>