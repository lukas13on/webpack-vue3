<template>
    <div id="editor-main">
        <Element v-for="(value, key, index) in list" :key="index" :content="value">
        </Element>
    </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
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

export default {
    data: function () {
        return {
            list: flatten(lista),
            data: {
                content: [
                    {
                        tag: 'div',
                        class: 'button-sample',
                        text: 'Et consequat fugiat consectetur culpa mollit.',
                        styles: {
                            textAlign: 'center'
                        },
                        content: [
                            {
                                tag: 'div',
                                content: [
                                    {
                                        tag: 'button',
                                        class: 'button-sample',
                                        text: 'Clique aqui',
                                        styles: {
                                            fontSize: '16px',
                                            color: 'red',
                                            border: '1px solid red'
                                        }
                                    },
                                    {
                                        tag: 'button',
                                        class: 'button-sample',
                                        text: 'Sair daqui',
                                        styles: {
                                            fontSize: '32px',
                                            color: 'red',
                                            border: '1px solid red'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]

            }
        };
    },
    components: {
        Element: Element
    }
}
</script>