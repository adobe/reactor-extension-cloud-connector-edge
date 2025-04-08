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

import fetch, { updateFetchSettings } from '../fetch';

let nativeFetch;
jest.mock('../getEnvironment');

beforeAll(() => {
  nativeFetch = window.fetch;
});

afterAll(() => {
  window.fetch = nativeFetch;
  jest.restoreAllMocks();
});

describe('fetch function', () => {
  afterEach(() => {
    window.fetch.mockReset();
  });

  describe('with settings configured', () => {
    beforeAll(() => {
      updateFetchSettings({ token: 'token', imsOrgId: 'orgId' });
    });

    test('returns data from endpoint', () => {
      window.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(['a', 'b', 'c'])
        })
      );

      expect(fetch('/letters')).resolves.toEqual(['a', 'b', 'c']);
    });

    test('throws an error when an invalid JSON is received', () => {
      window.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => {
            throw new Error('error');
          }
        })
      );

      expect(fetch('/letters')).rejects.toThrow(
        'The response returned by "https://reactor-stage.adobe.io/letters" is not a valid JSON.'
      );
    });

    test('throws an error when JSON with errors data is returned', () => {
      window.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ errors: [{ title: 'Some Error' }] })
        })
      );

      expect(fetch('/letters')).rejects.toThrow(
        'The URL "https://reactor-stage.adobe.io/letters" has returned: Some Error'
      );
    });

    test('throws an error when a not ok response without JSON errors is returned', () => {
      window.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Unauthorized',
          status: 401,
          json: () => Promise.resolve({})
        })
      );

      expect(fetch('/letters')).rejects.toThrow(
        'The URL "https://reactor-stage.adobe.io/letters" has returned: 401 Unauthorized'
      );
    });
  });

  describe('without settings configured', () => {
    let unconfiguredFetch;

    beforeAll(() => {
      jest.resetModules();
      unconfiguredFetch = jest.requireActual('../fetch').default;
    });

    test('throws an error', () => {
      window.fetch = jest.fn(() => {});
      expect(unconfiguredFetch('/letters')).rejects.toThrow(
        'No settings were found. You need to call `updateFetchSettings` before using `fetch`.'
      );
    });
  });
});
