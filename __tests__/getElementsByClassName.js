const DOMParse = require('../index.js');

describe('getting elements by class name', function () {
  const parser = new DOMParse();

  describe('Dom', function(){
    it('spaces and case', function(){
      const html =
        `<div class="examples">
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
        </div>`;

      const dom = parser.parseFromString(html);
      const elements = dom.getElementsByClassName('example');
      expect(elements.length).toBe(5);
    });

    it('nested elements', function(){
      const html = `
        <div class="examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="example    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as nasted">
            <div class="examples">
              <span>text</span>
              <div class="example"></div>
              <span>text</span>
              <div class=" example"></div>
              <div class="  example"></div>
              <span>text</span>
              <div class="example    "></div>
              <span>text</span>
              <div class=" asd example ss"></div>
              <div class=" sd examples"></div>
              <span>text</span>
              <div class=" example as nasted">
              </div>
            </div>
          </div>
        </div>
      `;

      const dom = parser.parseFromString(html);
      const elements = dom.getElementsByClassName('example');
      expect(elements.length).toBe(12);
    });
  });

  describe('Node', function(){
    it('root: spaces and case', function(){
      const html = `
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
      const elements = root.getElementsByClassName('example');
      expect(elements.length).toBe(5);
    });

    it('nested elements', function(){
      var html = `
        <div class="  root examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="example    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as nasted">
            <div class="examples">
              <span>text</span>
              <div class="example"></div>
              <span>text</span>
              <div class=" example"></div>
              <div class="  example"></div>
              <span>text</span>
              <div class="example    "></div>
              <span>text</span>
              <div class=" asd example ss"></div>
              <div class=" sd examples"></div>
              <span>text</span>
              <div class=" example as nasted">
              </div>
            </div> +
          </div>
        </div>
      `;

      const dom = parser.parseFromString(html);
      const root = dom.getElementsByClassName('root')[0];
      const elements = root.getElementsByClassName('example');
      expect(elements.length).toBe(12);
    });
  });
});