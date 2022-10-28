<template>
    <div id="editor">
        <Element v-for="(e01, i01) in nodes" :key="i01">
            {{ e01.label }}
            <Element v-for="(e02, i02) in e01.children" :key="i02">
                {{ e02.label }}
                <Element v-for="(e03, i03) in e02.children" :key="i03">
                    {{ e03.label }}
                    <Element v-for="(e04, i04) in e03.children" :key="i04">
                        {{ e04.label }}
                    </Element>
                </Element>
            </Element>
        </Element>
    </div>
</template>

<script>

var tree = [
    {
        label: "A cool folder",
        children: [
            {
                label: "A cool sub-folder 1",
                children: [
                    {
                        label: "A cool sub-sub-folder 2",
                        children: [
                            { label: "This one is not that cool" },
                            { label: "This one is not that cool" }
                        ]
                    },
                    { label: "A cool sub-sub-folder 3" }
                ]
            },
            { label: "This one is not that prelast" }
        ]
    },
    { label: "This one is not that last" }
];

import Tree from './components/Tree.vue.vue';
import Element from '../editor/components/Element.vue';

export default {
    data: function () {
        return {
            nodes: tree,
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
        Element: Element,
        Tree: Tree
    }
}
</script>