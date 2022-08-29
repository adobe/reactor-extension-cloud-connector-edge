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

const sendData = require('../sendData');
const arc = {};

describe('Send data library module', () => {
  test('makes a fetch call to the provided url', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const settings = {
      method: 'GET',
      url: 'http://www.someurl.com?a=1&b=2'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings
    };

    return sendData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith('http://www.someurl.com?a=1&b=2', {
        method: 'GET',
        body: undefined,
        headers: {}
      });
    });
  });

  test('makes a fetch call using the provided headers', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const settings = {
      method: 'GET',
      url: 'http://www.someurl.com?a=1&b=2',
      headers: [
        {
          key: 'a',
          value: 'b'
        },
        {
          key: 'c',
          value: 'd'
        }
      ]
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings
    };

    return sendData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith('http://www.someurl.com?a=1&b=2', {
        method: 'GET',
        body: undefined,
        headers: { a: 'b', c: 'd' }
      });
    });
  });

  test('makes a fetch call using the provided JSON body', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const settings = {
      method: 'GET',
      url: 'http://www.someurl.com?a=1&b=2',
      body: {
        a: 'b'
      }
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings
    };

    return sendData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith('http://www.someurl.com?a=1&b=2', {
        method: 'GET',
        body: '{"a":"b"}',
        headers: {}
      });
    });
  });

  test('makes a fetch call using the provided raw body', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const settings = {
      method: 'GET',
      url: 'http://www.someurl.com?a=1&b=2',
      body: 'raw'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings
    };

    return sendData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith('http://www.someurl.com?a=1&b=2', {
        method: 'GET',
        body: 'raw',
        headers: {}
      });
    });
  });

  test('saves the fetch call result', () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve([114, 101, 115, 117, 108, 116]) //result
      })
    );

    const settings = {
      method: 'GET',
      url: 'http://www.someurl.com?a=1&b=2',
      responseKey: 'a'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings
    };

    return sendData({ arc, utils }).then((cloudConnectorRuleStash) => {
      expect(cloudConnectorRuleStash).toStrictEqual({
        responses: { a: 'result' }
      });
    });
  });
});
