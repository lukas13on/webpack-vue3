<template>
    <div id="editor-main">
        <Element v-for="(value, key, index) in content" :key="index" :content="value">
        </Element>
    </div>
</template>

<script>
import { nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import Element from '../editor/components/Element.vue';

const lista = [
    {
        content: [
        ],
        label: '',
        text: "",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "10px"
        }
    }
];

/**
 * Coloca uma identificação em cada elemento da lista
 * @param {*} items Lista
 * @param {*} parentUuid
 * @returns 
 */
function identifyContentItems(items, parentUuid) {
    var res = [];
    items.forEach(function (item) {
        item.uuid = uuidv4();
        if (parentUuid) {
            item.parent = parentUuid;
        }
        if (item.content) {
            item.content = identifyContentItems(item.content, item.uuid);
        }
        res.push(item);
    });
    return res;
}

function identifyClonedItem(item, parentUuid) {
    if (!parentUuid) {
        item = JSON.parse(JSON.stringify(item));
    }
    item.uuid = uuidv4();
    item.active = false;
    if (parentUuid) {
        item.parent = parentUuid;
    }
    if (item.content) {
        item.content = identifyContentItems(item.content, item.uuid);
    }
    return item;
}

function prepareContentToSave(items) {
    var res = [];
    items.forEach(function (item) {
        delete item.uuid;
        delete item.active;
        if (item.content) {
            item.content = identifyContentItems(item.content, item.id);
        }
        res.push(item);
    });
    return res;
}

/**
 * Substitui um elemento da lista por outro valor
 * @param {*} replace camada substituta
 * @param {*} items camadas
 * @param {*} id camada alvo
 * @returns {*}
 */
function replaceContentItem(replace, items, id) {
    var res = [];
    items.forEach(function (item) {
        if (item.uuid === id) {
            item = replace;
            item.uuid = uuidv4();
        }
        if (item.content) {
            item.content = replaceContentItem(replace, item.content, id);
        }
        res.push(item);
    });
    return res;
}

/**
 * Remove um elemento da lista pela identificacao
 * @param {*} items 
 * @param {*} id camada alvo
 * @returns 
 */
function removeContentItem(items, id) {
    var res = [];
    items.forEach(function (item) {
        if (item.content) {
            item.content = removeContentItem(item.content, id);
        }
        if (item.uuid !== id) {
            res.push(item);
        }
    });
    return res;
}

/**
 * Ativa um elemento da lista pela identificacao
 * @param {*} items camadas
 * @param {*} id camada alvo
 */
function activeContentItem(items, id) {
    var res = [];
    items.forEach(function (item) {
        if (item.content) {
            item.content = activeContentItem(item.content, id);
        }
        if (item.uuid === id) {
            item.active = true;
        } else {
            item.active = false;
        }
        res.push(item);
    });
    return res;
}


/**
 * Desativa todos os elementos da lista
 * @param {*} items camadas
 */
function unactiveContent(items) {
    var res = [];
    items.forEach(function (item) {
        if (item.content) {
            item.content = unactiveContent(item.content);
        }
        item.active = false;
        res.push(item);
    });
    return res;
}

/**
 * 
 * @param {*} items camadas
 * @param {*} _item camada clone
 * @param {*} id camada alvo
 */
function cloneContent(items, _item, id) {
    //console.log(_item);
    if (!id) {
        items.push(_item);
    }
    var res = [];
    items.forEach(function (item) {
        //console.log(item)
        if (item.uuid === id) {
            item.content.push(_item);
        }
        if (item.content && id) {
            item.content = cloneContent(item.content, _item, id);
        }
        res.push(item);
    });
    return res;
}

/**
 * Remove o texto e o conteudo de tags autofechantes
 * @param {*} items camadas
 */
function normalizeSelfClosingElements(items) {
    var res = [];
    items.forEach(function (item) {
        if (item.tag === 'input' || item.tag === 'img') {
            delete item.content;
            delete item.text;
        } else {
            if (item.content) {
                item.content = normalizeSelfClosingElements(item.content);
            }
        }
        res.push(item);
    });
    return res;
}

export default {
    data: function () {
        return {
            content: identifyContentItems(lista),
            once: false
        };
    },
    mounted: function () {
        this.$emitter.emit('sent-editor-content', this.content);
        this.$emitter.on('sent-editor-content', this.receivedContent);
        this.$emitter.on('sent-changed-content', this.receivedChangedContents);
        this.$emitter.on('sent-active-content', this.activeContent);
        this.$emitter.on('sent-unactive-content', this.unactiveContent);
        this.$emitter.on('sent-clone-content', this.cloneContent);
        this.$emitter.on('sent-remove-content', this.removeContent);
        this.$emitter.on('sent-open-content', this.openFileContent);
        this.$emitter.on('sent-save-content', this.saveFileContent);
    },
    methods: {
        openFileContent() {
            var self = this;
            var element = document.createElement('input');
            element.setAttribute('type', 'file');
            element.setAttribute('accept', 'application/json');

            element.onchange = function () {
                var file = this.files[0];
                var fr = new FileReader();
                function receivedText(event) {
                    var result = event.target.result;
                    var obj = JSON.parse(result);
                    obj = identifyContentItems(obj);
                    //console.log(event, result, obj);
                    self.$emitter.emit('sent-editor-content', obj);
                }
                fr.onload = receivedText;
                fr.onerror = function () {
                    console.log('error');
                };
                fr.onabort = function () {
                    console.log('aborted');
                };
                fr.readAsText(file);
            };

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        },
        saveFileContent: function () {
            var element = document.createElement('a');
            var text = JSON.stringify(prepareContentToSave(this.content));
            element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'download.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        },
        refreshContent: function () {
            this.content = normalizeSelfClosingElements(this.content);
            this.$emitter.emit('sent-editor-content', this.content);
        },
        receivedChangedContents: function (data) {
            console.log('sent-changed-content', data);
            this.content = replaceContentItem(data.content, this.content, data.id);
            this.refreshContent();
        },
        removeContent: function (data) {
            console.log('sent-remove-content', data);
            this.content = removeContentItem(this.content, data.id);
            this.refreshContent();
        },
        activeContent: function (data) {
            console.log('sent-active-content', data);
            this.content = activeContentItem(this.content, data.id);
            this.refreshContent();
        },
        unactiveContent: function (data) {
            console.log('sent-active-content', data);
            this.content = unactiveContent(this.content);
            this.refreshContent();
        },
        cloneContent: function (data) {
            console.log('sent-clone-content', data);
            this.content = cloneContent(this.content, identifyClonedItem(data.content), data.id);
            this.refreshContent();
        },
        receivedContent: function (content) {
            console.log('sent-editor-content', content);
            this.content = content;
        },
    },
    components: {
        Element: Element
    }
}
</script>