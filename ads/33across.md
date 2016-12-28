<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# 33Across

For more information on 33Across please visit our [website](https://33across.com/).

For more information on our `amp-ad` implementation please contact `pub-support@33across.com`.

## Examples

#### amp-ad

```html
<amp-ad width=300 height=250
  type="33across"
  data-publisher="aeB0tx374r5jsPacwzm_6j">
</amp-ad>
```

#### amp-sticky-ad

```html
<amp-sticky-ad layout="nodisplay">
  <amp-ad width=320 height=50
    type="33across"
    data-publisher="aeB0tx374r5jsPacwzm_6j">
  </amp-ad>
</amp-sticky-ad>
```

## Configuration

#### Supported Attributes

- **width** - Required.
- **height** - Required.
- **data-publisher** - Required. 33Across publisher ID.
- **data-product** - Optional. Product name. Default: "inpage".

