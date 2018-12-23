const DOMParse = require('../index.js');
const pureString = require('../lib/pureString');

describe('outerHTML', function () {
  const parser = new DOMParse();

  it('unclosed tag', function(){
    const html = `
      <div id="root">
        <div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
            </div>
          </span>
        </div>
      </div>
    `;

    const dom = parser.parseFromString(html);
    const ctn = dom.getElementById('root');

    expect(pureString(ctn.outerHTML)).toEqual(pureString(html));
  });
});