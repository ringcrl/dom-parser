const DOMParse = require('../index.js');

describe('getting element by id', function () {
  const parser = new DOMParse();

  describe('Dom', function(){
    it('getting element by id', function(){
      const html = `
        <div class="examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div id="example" class="example with id"></div>
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
      const element = dom.getElementById('example');
      const notExistsElement = dom.getElementById('notExists');

      expect(element.getAttribute('class')).toBe('example with id');
      expect(notExistsElement).toBeNull();
    });

    it('getting only first element', function(){
      const html = `
        <div class="examples">
          <span>text</span>
          <div id="example" class="first example"></div>
          <span>text</span>
          <div class=" example"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="example    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as nasted"> +
            <div class="examples">
              <span>text</span>
              <div id="example" class="second example"></div>
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

      const  dom = parser.parseFromString(html);
      const element = dom.getElementById('example');

      expect(element.getAttribute('class')).toBe('first example');
    });
  });


  describe('Node', function(){
    it('getting element by id', function(){
      const html = `
        <div id="root" class="examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div id="example" class="example with id"></div>
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
      const root = dom.getElementById('root');
      const element = root.getElementById('example');
      const notExistsElement = root.getElementById('notExists');

      expect(element.getAttribute('class')).toBe('example with id');
      expect(notExistsElement).toBeNull();
    });

    it('getting only first element', function(){
      const html = `
        <div id="root" class="examples">
          <span>text</span>
          <div id="example" class="first example"></div>
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
              <div id="example" class="second example"></div>
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
      const element = dom.getElementById('example');

      expect(element.getAttribute('class')).toBe('first example');

    });
  });



});