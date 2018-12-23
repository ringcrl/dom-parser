const DOMParse = require('../index.js');

describe('getting elements by name', function () {
  const parser = new DOMParse();

  describe('Dom', function(){
    it('case', function(){
      const html = `
        <form id="form">
          <input name="example" type="text"/><span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example">
             <input class="input" name="example">
             <input class="input" name="exaMple">
          </div>
          </div>
        </form>
      `;

      const dom = parser.parseFromString(html);
      const root = dom.getElementById('form');
      const elements = root.getElementsByName('example');
      expect(elements.length).toBe(2);
    });
  });

  describe('Node', function(){
    it('spaces and case', function(){
      const html = `
        <form id="form">
          <input name="example" type="text"/><span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"> +
            <input class="input" name="example"> 
          </div>
          </div>
        </form>
      `;

      const dom = parser.parseFromString(html);
      const elements = dom.getElementsByName('example');
      expect(elements.length).toBe(2);
    });
  });


});