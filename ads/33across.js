/**
 * Copyright 2016,2017 The AMP HTML Authors. All Rights Reserved.
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
import {endsWith} from '../src/string';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function _33across(global, data) {

  /*
    Validate amp-ad attributes.
    required: data-publisher.
    optional: data-product, options (via json), data-html-access-allowed.
  */
  validateData(data, ['publisher'], ['product', 'options',
    'htmlAccessAllowed']);

  // Validate publisher ID.
  if (data.publisher.length != 22 || data.publisher.indexOf(' ') >= 0) {
    global.context.noContentAvailable();
    throw new Error('Invalid 33Across publisher: ' + data.publisher);
  }

  // Determine product and distro.

  let distro = 'siab',
    prdName = (data.product || 'inpage').toLowerCase().replace(/-| /g, '');

  switch (prdName) {
    case 'siab':
      prdName = 'inpage';
      break;
    case 'inpage':
      break;
    case 'infeed':
      distro = 'infeed';
      break;
    default:
      global.context.noContentAvailable();
      throw new Error('Invalid 33Across product: ' + prdName);
  }

  // Initialize Tynt object.
  global.Tynt = [];
  global.Tynt.cmd = [];
  global.Tynt.isAmp = true;

  // Set body styles.
  const bs = global.document.body.style;
  bs.margin = '0';
  bs.padding = '0';
  bs.lineHeight = '0';
  bs.backgroundColor = 'transparent';

  // Handle options.

  const op = data.options;
  let prdOpt = false;

  if (op) {
    if (op.prd) {
      prdOpt = op.prd;
    }
    if (op.env) {
      global.Tynt.e = op.env;
      if (!endsWith(op.env, '-')) {
        global.Tynt.e += '-';
      }
    }
    if (op.dco) {
      global.Tynt.overrides = [];
      global.Tynt.overrides.push(op.dco);
    }
    if (op.upo) {
      global.Tynt.parameters = op.upo;
    }
  }

  // Check for required product options.

  const targetId = 'x33x' + Date.now(),
    size = data.width + 'x' + data.height;

  if (!prdOpt) {
    prdOpt = {size, targetId};
  }
  else {
    if (!prdOpt.size) {
      prdOpt.size = size;
    }
    if (!prdOpt.targetId) {
      prdOpt.targetId = targetId;
    }
  }

  // Schedule product installation.

  global.Tynt.cmd.push({
    publisherId: data.publisher,
    fn: function() {
      window.Tynt.ads.display(data.publisher, prdName, prdOpt);
    },
  });

  loadScript(global, 'https://cdn.tynt.com/' + distro + '.js');

}


