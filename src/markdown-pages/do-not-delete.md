---
path: "/do-not-delete"
date: "2019-05-04"
title: "Do Not Delete"
template: "markdown"
---

# Don't Delete:

> [!CAUTION]
>
> For some reason we need at least one [markdown](https://example.com) file in the markdown-pages directory in order for the build to succeed

```json tab-group='hello-world-snippets' tab-name='json'
{
  "op": "copy",
  "target": {
    "path": "/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/target"
  },
  "source": {
    "path": "/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/source/test.psd"
  }
}
```

```ruby tab-group='hello-world-snippets' tab-name='ruby'
require("csim")

S = SwitchBank.new
A = AndGate.new
#A.join(Tester.new("A"))
B = OrGate.new
#B.join(Tester.new("B"))
C = XorGate.new
#C.join(Tester.new("C"))
L = LED.new('Result');

S.join(A)
S.join(A)
A.join(B)
S.join(B)
B.join(C)
S.join(C)
C.join(L)

for x in (0..15)
  for s in [3,2,1,0]
    print (x>>s) & 1
  end
  print " => "
  S.value = x
end
```

```javascript tab-group='hello-world-snippets' tab-name='javascript'
module.exports = (code, additionalHtmlEscapes = {}) => {
  const baseHTMLEscapes = {
    "&": `&amp;`,
    ">": `&gt;`,
    "<": `&lt;`,
    '"': `&quot;`,
    "'": `&#39;`,
  }

  const htmlEscapes = {
    ...additionalHtmlEscapes,
    ...baseHTMLEscapes,
  }

  const escapedChars = char => htmlEscapes[char]

  const chars = Object.keys(htmlEscapes)

  const charsRe = new RegExp(`[${chars.join(``)}]`, `g`)

  const rehasUnescapedChars = new RegExp(charsRe.source)

  return code && rehasUnescapedChars.test(code)
    ? code.replace(charsRe, escapedChars)
    : code
}
```

Stuff afterwards
