~tabs~tab=title,()

Parser:
Components:
Look for '~' character to check if any special properties are used in markdown
If present, split string along the ~ to get the various components

    Tabs:
      A tabs component is a top level title representing a collection of tab components and must be
      declared before any tab component be declared.

      The parsing phrase to look for is '~tabs'

    Tab:
      A tab component is a collection comprising a title and a body. Anything put in the body
      should be parsed as regular markdown

      The parsing phrase to look for is '~tab=title,(markdown)'


function categorize(string) {
if (string.inludes('tabs')) return 'tabs'
if (string.includes('tab=')) return 'tab'
...
}

function parseString(markdown) {
const doc = {}
if (markdown.includes('~')) {
const components = markdown.split('~');
components.forEach(el => {
const type = categorize(el);
switch(type) {
case 'tabs':
doc.tabs = [];
break;
case: 'tab':
const payload = el.split('=')[1];
const title = payload.split(',')[0].trim();
const contentContainer = payload.split(',')[1].trim();
const content = contentContainer.substring(1, contentContainer.length - 2).trim();
doc.tabs.push({ title, content });
break;
}
})
}
}
