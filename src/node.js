class Node {
  constructor(cfg) {
    this.attributes = cfg.attributes || [];
    this.childNodes = cfg.childNodes;
    this.nodeType = cfg.nodeType;
  }

  getAttribute(attributeName) {
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i].name == attributeName) {
        return this.attributes[i].value;
      }
    }
    return null;
  }

  getElementById(id) {
    const result = this.searchElements(this, function(elem){
      return elem.attributes.length && elem.getAttribute('id') == id;
    }, true);

    return result || null;
  }

  searchElements(root, conditionFn, onlyFirst) {
    let result = [];
    onlyFirst = !!onlyFirst;
    if (root.nodeType !== 3) {
      for (let i = 0; i < root.childNodes.length; i++) {
        const childNode = root.childNodes[i];
        if (childNode.nodeType !== 3 && conditionFn(childNode)) {
          result.push(root.childNodes[i]);
          if (onlyFirst) {
            break;
          }
        }
        result = result.concat(this.searchElements(childNode, conditionFn));
      }
    }

    return onlyFirst ? result[0] : result;
  }
}

module.exports = Node;