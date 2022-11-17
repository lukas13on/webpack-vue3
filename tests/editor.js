const uuidv4 = function () {
    return makeid(16);
};

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var lista = [
    {
        content: [
            {
                content: [
                ],
                label: 'Level 2',
                text: "",
                attribute: {
                    id: "",
                    class: "",
                },
                tag: "",
                style: {
                    backgroundColor: "#000000",
                    color: "#ffffff"
                },
            },
            {
                content: [
                    {
                        content: [
                        ],
                        label: 'Level 3',
                        text: "",
                        attribute: {
                            id: "",
                            class: "",
                        },
                        tag: "",
                        style: {
                            backgroundColor: "#000000",
                            color: "#ffffff"
                        },
                    }
                ],
                label: 'Level 2',
                text: "",
                attribute: {
                    id: "",
                    class: "",
                },
                tag: "",
                style: {
                    backgroundColor: "#000000",
                    color: "#ffffff"
                },
            }
        ],
        label: 'Level 1',
        text: "",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff"
        },
    },
    {
        content: [
        ],
        label: 'Level 1',
        text: "",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff"
        },
    },
    {
        content: [
        ],
        label: 'Level 1',
        text: "",
        attribute: {
            id: "",
            class: "",
        },
        tag: "",
        style: {
            backgroundColor: "#000000",
            color: "#ffffff"
        },
    },
];

var replace = {
    content: [
    ],
    label: 'Substituido',
    text: "",
    attribute: {
        id: "",
        class: "",
    },
    tag: "",
    style: {
        backgroundColor: "#000000",
        color: "#ffffff"
    },
};

function perform(items) {
    var res = [];
    items.forEach(function (item) {
        console.log(item);
        if (item.content) {
            item.content = perform(item.content);
        }
        res.push(item);
    });
    return res;
}

// TESTADO

// console.log('identifyContentItems');
/**
 * Coloca uma identificação em cada elemento da lista
 * @param {*} items Lista
 * @param {*} parentUuid
 * @returns 
 */
function identifyContentItems(items, parentUuid) {
    var res = [];
    items.forEach(function (item) {
        item.uuid = uuid();
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

// console.log(identifyContentItems(lista));

var listaIdentificada = identifyContentItems(lista);
console.log('listaIdentificada', listaIdentificada);

// TESTADO

// console.log('replaceContentItem');

/**
 * Substitui um elemento da lista por outro valor
 * @param {*} replace Valor
 * @param {*} items Lista
 * @param {*} id Identificação
 * @returns 
 */
function replaceContentItem(replace, items, id) {
    var res = [];
    items.forEach(function (item) {
        if (item.uuid === id) {
            item = replace;
            item.uuid = uuid();
        }
        if (item.content) {
            item.content = replaceContentItem(replace, item.content, id);
        }
        res.push(item);
    });
    return res;
}

// const substituirUuid = listaIdentificada[0].content[1].uuid;

// console.log(substituirUuid);

// console.log(replaceContentItem(replace, listaIdentificada, substituirUuid));

// TESTADO

console.log('removeContentItem');

/**
 * Remove um elemento da lista pela identificacao
 * @param {*} items 
 * @param {*} id 
 * @returns 
 */
function removeContentItem(items, id) {
    var res = [];
    items.forEach(function (item) {
        console.log(item);
        if (item.content) {
            item.content = removeContentItem(item.content, id);
        }
        if (item.uuid !== id) { 
            res.push(item);
        }
    });
    return res;
}

const removerUuid = listaIdentificada[0].content[0].uuid;

console.log(removerUuid);

console.log(removeContentItem(listaIdentificada, removerUuid));