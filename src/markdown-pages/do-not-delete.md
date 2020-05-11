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

```javascript {tabGroup: test}{tabName: JS}
async function simonExploreRootDirectory(access_token) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/vnd.adobecloud.directory+json",
      "x-Api-key": CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  }

  let response = await fetch(
    `https://platform-cs-stage.adobe.io/assets`,
    requestOptions
  )
  let data = await response.json()
  let children = data.children
  if (children.length > 0) {
    let root = null
    for (let i = 0; i < children.length; i++) {
      let embedded = children[i]._embedded
      for (const property in embedded) {
        if (embedded[property]["repo:repositoryId"] === IMS_ORG) {
          root = embedded[property]
        }
      }
    }
    return root
  }
}
```

```json {tabGroup: test}{tabName: JSON}
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

```json
{}
```

```json {tabGroup: ack}{tabName: JSON}
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

```ruby {tabGroup: ack}{tabName: Ruby}
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
