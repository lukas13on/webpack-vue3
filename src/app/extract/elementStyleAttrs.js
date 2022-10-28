function elementStyleAttrs(element) {

    try {

        const attributes = [];

        if (element === undefined) {
            element = document.createElement('div');
        }

        for (const attribute in element.style) {
            if (attribute.indexOf('webkit') === -1 &&
                attribute.indexOf('moz') === -1 &&
                attribute.indexOf('ms') === -1) {
                attributes.push(attribute);
                //attributes[attribute] = '';
            }
        }

        return attributes;

    } catch (error) {
        throw new Error(error.message);
    }

}

export default elementStyleAttrs;