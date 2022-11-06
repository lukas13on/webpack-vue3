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
            content: flatten(lista),
        };
    },
    mounted: function () {
        this.$emitter.emit('sent-editor-content', this.content);
        this.$emitter.on('sent-changed-content', this.receivedChangedContents);
    },
    methods: {
        receivedChangedContents: function (content) {
            console.log('receivedChangedContents', content);
            this.content = fidden(this.content, content);
        }
    },
    components: {
        Element: Element
    }
}
</script>