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

import { addToEntityFromVariables } from '../../../utils/entityVariablesConverter';
import requestMethodHelper from '../requestSection/requestMethodHelper';

export default ({ method, bodyType, bodyRaw, bodyJsonPairs }) => {
  let body;
  const settings = {};

  if (bodyType === 'object') {
    body = addToEntityFromVariables(
      {},
      bodyJsonPairs.filter((p) => p.key || p.value)
    );

    if (Object.keys(body).length === 0) {
      body = null;
    }
  } else {
    try {
      body = JSON.parse(bodyRaw);
    } catch {
      body = bodyRaw;
    }
  }

  if (body && requestMethodHelper.showBodyTab(method)) {
    settings.body = body;
  }

  return settings;
};
