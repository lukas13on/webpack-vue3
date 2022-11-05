<template>
    <h2>Atributos</h2>
    <div class="form-group" v-for="(style, key) in content.style" :key="key" v-show="showAttribute(key)">
        <label>{{ key }}</label>
        <input type="text" class="form-control" :value="test(key)"/>
    </div>
</template>

<script>
import elementStyleAttrs from '../../../../app/extract/elementStyleAttrs';

export default {
    data: function () {
        return {
            content: {
                style: [

                ]
            }
        };
    },
    mounted: function () {
        this.$emitter.on('sent-attributes-content', this.receiveElementData);
    },
    methods: {
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
        receiveElementData: function (data) {
            this.content = data;
            this.computeContentStyle(data);
            //console.log(data);
        },
        computeContentStyle: function (content) {

            //console.log(content);

            // if (content.style === undefined) {
            //     return {};
            // }

            const standard = elementStyleAttrs();
            const styles = {};

            for (const attribute of standard) {
                //console.log(attribute);
                //console.log(value);
                if (content.style !== undefined && typeof content.style[attribute] === 'string') {
                    styles[attribute] = content.style[attribute];
                } else {
                    styles[attribute] = null;
                }
            }

            this.content.style = styles;
            //console.log(styles);
            //return styles;
        },
    }
};
</script>