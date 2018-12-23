class Node {

  constructor(cfg) {

    Node.ELEMENT_NODE = 1;
    Node.TEXT_NODE = 3;

    this.namespace = cfg.namespace || null;
    this.text = cfg.text;
    this._selfCloseTag = cfg.selfCloseTag;

    Object.defineProperties(this, {
      nodeType: {
        value: cfg.nodeType,
      },
      nodeName: {
        value: cfg.nodeType == 1 ? cfg.nodeName : '#text',
      },
      childNodes: {
        value: cfg.childNodes,
      },
      firstChild: {
        get() {
          return this.childNodes[0] || null;
        },
      },
      lastChild: {
        get() {
          return this.childNodes[this.childNodes.length - 1] || null;
        },
      },
      parentNode: {
        value: cfg.parentNode || null,
      },
      attributes: {
        value: cfg.attributes || [],
      },
      innerHTML: {
        get() {
          let result = '';
          let cNode;
          for (let i = 0; i < this.childNodes.length; i++) {
            cNode = this.childNodes[i];
            result += cNode.nodeType === 3 ? cNode.text : cNode.outerHTML;
          }
          return result;
        },
      },
      outerHTML: {
        get() {
          let str;
          if (this.nodeType != 3) {
            let attrs = (this.attributes.map(function (elem) {
                return elem.name + (elem.value ? '=' + '"' + elem.value + '"' : '');
              }) || []).join(' ');
            let childs = '';

            str = '<' + this.nodeName + (attrs ? ' ' + attrs : '') + (this._selfCloseTag ? '/' : '') + '>';

            if (!this._selfCloseTag) {
              childs = (this._selfCloseTag ? '' : this.childNodes.map(function (child) {
                return child.outerHTML;
              }) || []).join('');

              str += childs;
              str += '</' + this.nodeName + '>';
            }
          }
          else {
            str = this.textContent;
          }
          return str;
        },
      },
      textContent: {
        get() {
          if (this.nodeType == Node.TEXT_NODE) {
            return this.text;
          }
          else {
            return this.childNodes.map(function (node) {
              return node.textContent;
            }).join('').replace(/\x20+/g, ' ');
          }
        },
      },
    });
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
    const result = this.searchElements(this, function (elem) {
      return elem.attributes.length && elem.getAttribute('id') == id;
    }, true);

    return result || null;
  }

  getElementsByClassName(className) {
    const expr = new RegExp('^(.*?\\s)?' + className + '(\\s.*?)?$');
    return this.searchElements(this, function (elem) {
      return elem.attributes.length && expr.test(elem.getAttribute('class'));
    });
  }

  getElementsByName(name) {
    return this.searchElements(this, function (elem) {
      return elem.attributes.length && elem.getAttribute('name') == name;
    });
  }

  getElementsByTagName(tagName) {
    return this.searchElements(this, function (elem) {
      return elem.nodeName == tagName;
    });
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