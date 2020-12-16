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

import '@testing-library/jest-dom';

// Force screen width, otherwise the Mobile Combobox or Picker will be rendered inside the tests.
jest
  .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
  .mockImplementation(() => 1000);
jest
  .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
  .mockImplementation(() => 1000);

jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
