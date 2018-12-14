const Node = require('./node');

class Dom {
  constructor(rawHTML) {
    this.rawHTML = rawHTML;

    this.reg = {
      tag: /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z\/]))*/gi,
      tagStart: /^<[a-z]/,
      attr: /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi,
      splitAttr: /(\s[a-z0-9-_]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/i,
      nodeName: /<\/?([a-z][a-z0-9]*)(?::([a-z][a-z0-9]*))?/i,
      selfCloseTag: /\/>$/,
      closeTag: /^<\//,
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
    const result = [];
    let currentObject = null;
    let buffer = undefined;
    let attrBuffer = undefined;
    let tagsCount = 0;
    let composing = false;
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const fullNodeName = tag.match(this.reg.nodeName);
      const nodeName = fullNodeName && fullNodeName[1];
      const nameSpace = fullNodeName && fullNodeName[2];
      const matchingReg = reg.test(tag);
      if (matchingReg && !composing) {
        composing = true;
      }
      
      if (composing) {
        if (this.reg.tagStart.test(tag)) {
        const selfCloseTag = this.reg.selfCloseTag.test(tag) ||
            this.reg.noClosingTags.test(nodeName);
          const attributes = [];
          const attrStr = tag.match(this.reg.attr) || [];
          for (let j = 0; j < attrStr.length; j++) {
            const attr = attrStr[j];
            attrBuffer = this.reg.splitAttr.exec(attr);
            attributes.push({
              name: attrBuffer[1].trim(),
              value: (attrBuffer[2] || '').trim().replace(this.reg.attributeQuotes, ''),
            });
          }

          ((currentObject && currentObject.childNodes) || result).push(buffer = new Node({
            nodeType: 1, // element node
            nodeName,
            nameSpace,
            attributes,
            childNodes: [],
            parentNode: currentObject,
            startTag: tag,
            selfCloseTag,
          }));

          tagsCount++;

          if(!onlyFirst && matchingReg && currentObject) {
            result.push(buffer);
          }

          if (selfCloseTag) {
            tagsCount--;
          } else {
            currentObject = buffer;
          }
        } else if (this.reg.closeTag.test(tag)) {
          if (currentObject.nodeName == nodeName) {
            currentObject = currentObject.parentNode;
            tagsCount--;
          }
        } else {
          currentObject.childNodes.push(new Node({
            nodeType: 3,
            text: tag,
            parentNode: currentObject,
          }));
        }

        if (tagsCount == 0) {
          composing = false;
          currentObject = null;

          if (onlyFirst) {
            break;
          }
        }
      }
    }

    return onlyFirst ?
      result[0] || null :
      result;
  }
}

module.exports = Dom;