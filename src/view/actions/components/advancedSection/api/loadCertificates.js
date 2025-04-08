/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fetch, { getFetchSettings } from '../../../../utils/fetch';

export default async () => {
  const { propertyId } = getFetchSettings();

  const url =
    `/properties/${propertyId}/` +
    'environments?page[size]=999&page[number]=1&filter[environment_id]=NOT%20null&include=adobe_certificate';

  try {
    return await fetch(url);
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error(`${e.message} when loading ${url}`);
    } else {
      throw e;
    }
  }
};
