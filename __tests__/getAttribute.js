const DOMParse = require('../index.js');

describe('getAttribute', function () {

  const parser = new DOMParse();

  it('attr value with "="', function(){
    const html = `
      <div id="outer" data-a ttt  =  "asd\'">
        <a id="inner" href="/search?field=123"></a>
      </div>
    `;

    const dom = parser.parseFromString(html);
    const outer = dom.getElementById('outer');
    const inner = dom.getElementById('inner');

    expect(outer.attributes.length).toBe(3);
    expect(outer.getAttribute('id')).toBe('outer');
    expect(outer.getAttribute('data-a')).toBe('');
    expect(outer.getAttribute('ttt')).toBe('asd\'');
    expect(outer.getAttribute('not-exists')).toBeNull();
    expect(inner.getAttribute('href')).toBe('/search?field=123');

  });
});

