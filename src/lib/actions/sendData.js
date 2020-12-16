/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

const byteArrayToString = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

module.exports = ({
  arc: { ruleStash = {} },
  utils: { fetch, getSettings }
}) => {
  let headers = {};

  const settings = getSettings();
  const { url, headers: settingsHeaders, method, responseKey } = settings;
  let { body } = settings;

  if (settingsHeaders && settingsHeaders.length > 0) {
    headers = settingsHeaders.reduce((accumulator, o) => {
      accumulator[o.key] = o.value;
      return accumulator;
    }, {});
  }

  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  const fetchOptions = {
    method,
    body,
    headers
  };

  return fetch(url, fetchOptions).then((r) => {
    const accRuleStash = ruleStash['adobe-cloud-connector'] || {
      responses: {}
    };

    if (responseKey) {
      return r
        .arrayBuffer()
        .then(byteArrayToString)
        .then((bodyResponse) => {
          accRuleStash.responses[responseKey] = bodyResponse;
          return accRuleStash;
        });
    }

    return accRuleStash;
  });
};
