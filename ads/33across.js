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
    throw new Error('Invalid 33Across publisher: ' + data.publisher);
  }

  var distro = 'siab',
    product = (data.product || 'inpage').toLowerCase().replace(/-| /g, '');

  switch (product) {
    case 'siab':
      product = 'inpage';
      break;
    case 'inpage':
      break;
    case 'infeed':
      distro = 'infeed';
      break;
    case 'inview':
      distro = 'rciv';
      break;
    default:
      global.context.noContentAvailable();
      throw new Error('Invalid 33Across product: ' + product);
  }

  global.Tynt = [];
  global.Tynt.cmd = [];
  global.Tynt.isAmpAd = true;
  global.document.body.style.margin = '0';
  global.document.body.style.padding = '0';

  if (data.debug) {
    if (data.debug.indexOf('tc') >= 0) {
      global.Tynt.debug = 1;
    }
    // TODO: sicDebug will not be supported by SIC, need some other solution
    if (data.debug.indexOf('sic') >= 0) {
      global.Tynt.overrides = {sicDebug: true};
    }
  }

  const tagId = 'x33x' + Date.now(),
    adSize = data.width + 'x' + data.height;

  global.Tynt.cmd.push({
    publisherId: data.publisher,
    fn: function() {
      Tynt.ads.display(data.publisher, product, {size: adSize, targetId: tagId});
    }
  });

  loadScript(global, 'https://cdn.tynt.com/' + distro + '.js');

  global.context.renderStart();
}

