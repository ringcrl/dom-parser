const DOMParse = require('../index.js');
const pureString = require('../lib/pureString');

describe('textContent', function () {
  const parser = new DOMParse();

  it('unclosed tag', function(){
    const html = `
      <div id="root">
        <div class="container">
          some text
          <span>
            <div class="broken">
              <div class="inner"> 123 </div>
            </div>
          some text
          </span>
        </div>
      </div>
    `;

    const dom = parser.parseFromString(html);
    const ctn = dom.getElementById('root');

    expect(pureString(ctn.textContent)).toEqual(pureString('some text 123 some text'));
  });
});