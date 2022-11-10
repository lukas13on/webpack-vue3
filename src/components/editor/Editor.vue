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
        label: 'Sem nome',
        text: "",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff"
        }
    },
];

function identifyContentItems(items) {
    var res = [];
    items.forEach(function (item) {
        var _item = item;
        _item.uuid = uuidv4();
        var keys = Object.keys(item);
        const index = keys.indexOf('content');
        keys.splice(index, 1);
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

function replaceContentItem(items, _item) {
    const flat = [];

    items.forEach(function (item) {
        if (!Array.isArray(item)) {
            if (item.uuid !== _item.uuid) {
                flat.push(item);
            } else {
                flat.push(_item);
            }
        } else {
            flat.push(...replaceContentItem(item));
        }
    });

    return flat;
}

function removeContentItem(items, _item) {
    const flat = [];

    items.forEach(function (item) {
        if (!Array.isArray(item)) {
            if (item.uuid !== _item.uuid) {
                flat.push(item);
            }
        } else {
            flat.push(...removeContentItem(item));
        }
    });

    return flat;
}


export default {
    data: function () {
        return {
            content: identifyContentItems(lista),
        };
    },
    mounted: function () {
        this.$emitter.emit('sent-editor-content', this.content);
        this.$emitter.on('sent-editor-content', this.receivedContent);
        this.$emitter.on('sent-changed-content', this.receivedChangedContents);
        this.$emitter.on('sent-remove-content', this.removeContent);
    },
    methods: {
        refreshContent: function () {
            this.$emitter.emit('sent-editor-content', this.content);
        },
        receivedChangedContents: function (content) {
            console.log('sent-changed-content', content);
            this.content = replaceContentItem(this.content, content);
            this.refreshContent();
        },
        removeContent: function (content) {
            console.log('sent-remove-content', content);
            this.content = removeContentItem(this.content, content);
            this.refreshContent();
        },
        receivedContent: function (content) {
            console.log('sent-editor-content', content);
            this.content = content;
        }
    },
    components: {
        Element: Element
    }
}
</script>