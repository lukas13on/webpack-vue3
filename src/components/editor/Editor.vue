<template>
    <div id="editor">
        <Tree :data="tree"></Tree>
    </div>
</template>

<script>

var tree = {
    label: "A cool folder",
    children: [
        {
            label: "A cool sub-folder 1",
            children: [
                { label: "A cool sub-sub-folder 1" },
                { label: "A cool sub-sub-folder 2" }
            ]
        },
        { label: "This one is not that cool" }
    ]
};

import Tree from './components/Tree.vue.vue';
import Element from '../editor/components/Element.vue';

export default {
    data: function () {
        return {
            tree:tree,
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