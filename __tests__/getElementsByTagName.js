const DOMParse = require('../index.js');

describe('getting elements by tag name', function () {
  const parser = new DOMParse();

  describe('Dom', function(){
    it('divs and spans', function(){
      const html = `
        <div class="examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="exAmple    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as">
          </div>
        </div>
      `;

      const dom = parser.parseFromString(html);
      const divs = dom.getElementsByTagName('div');
      const spans = dom.getElementsByTagName('span');

      expect(divs.length).toBe(8);
      expect(spans.length).toBe(5);
    });
  });

  describe('Node', function(){
    it('divs and spans', function(){
      var html = `
        <div class="examples root">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="exAmple    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as">
          </div>
        </div>
      `;

      const dom = parser.parseFromString(html);
      const root = dom.getElementsByClassName('root')[0];
      const divs = root.getElementsByTagName('div');
      const spans = root.getElementsByTagName('span');

      expect(divs.length).toBe(7);
      expect(spans.length).toBe(5);
    });
  });
});