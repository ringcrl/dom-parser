class Node {
  constructor() {}

  getAttribute(attributeName) {
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i].name == attributeName) {
        return this.attributes[i].value;
      }
    }
    return null;
  }
}

class Dom {
  constructor(rawHTML) {
    this.rawHTML = rawHTML;

    this.reg = {
      tag: /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z\/]))*/gi,
      tagStart: /^<[a-z]/,
      attr: /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi,
      splitAttr: /(\s[a-z0-9-_]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/gi,
      nodeName: /<\/?([a-z][a-z0-9]*)(?::([a-z][a-z0-9]*))?/i,
      selfCloseTag: /\/>$/,
      attributeQuotes: /^('|")|('|")$/g,
      noClosingTags: /^(?:area|base|br|col|command|embed|hr|img|input|link|meta|param|source)/i,
    };
  }

  getElementById(id){
    const reg = new RegExp('id=(\'|")' + id + '\\1');
    return this.findByRegExp(this.rawHTML, reg, true);
  }

  findByRegExp(html, reg, onlyFirst) {
    const tags = html.match(this.reg.tag);
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const fullNodeName = tag.match(this.reg.nodeName);
      const nodeName = fullNodeName && fullNodeName[1];
      const nameSpace = fullNodeName && fullNodeName[2];
      const matchingReg = reg.test(tag);
      
      if (matchingReg) {
        if (this.reg.startTag.test(tag)) {
          const isSelfCloseTag = this.reg.selfCloseTag(tag) || this.reg.noClosingTags.test(nodeName);
          const attributes = [];
          const attrStr = tag.match(this.reg.attr) || [];
        }
      }
    }
  }
}

class DOMParse {
  constructor() {}

  parseFromString(str) {
    return new Dom(str);
  }
}

module.exports = DOMParse;
