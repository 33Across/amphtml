/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {loadScript, validateData} from '../3p/3p';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function _33across(global, data) {

  validateData(data, ['publisher'], ['product', 'debug']);

  if (data.publisher.length != 22 || data.publisher.indexOf(' ') >= 0) {
    global.context.noContentAvailable();
    throw new Error('Invalid 33Across publisher ID: ' + data.publisher);
  }

  global.Tynt = [];
  global.Tynt.cmd = [];
  global.Tynt.isAmpAd = true;
  global.document.body.style.margin = '0';
  global.document.body.style.padding = '0';

  if (data.debug && data.debug.indexOf('log') >= 0) {
    global.location.search = '__tcdebugmode=1&__rtdebugmode=1';
  }

  const tagId = 'x33x' + Date.now(),
    product = data.product || 'inpage',
    adSize = data.width + 'x' + data.height;

  global.document.getElementById('c').setAttribute('id', tagId);

  global.Tynt.cmd.push({
    publisherId: data.publisher,
    fn: function() {
      Tynt.ads.display(data.publisher, product, {size: adSize, targetId: tagId});
    }
  });

  var distro = (product === 'inpage' ? 'siab' : product) + '.js';
  loadScript(global, 'https://cdn.tynt.com/' + distro);
  global.context.renderStart();
}

