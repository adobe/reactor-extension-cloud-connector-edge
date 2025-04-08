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

import { screen, act } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';
import {
  changePickerValue,
  changeInputValue,
  click
} from '../../__tests_helpers__/jsDomHelpers';

import SendData from '../sendData';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;
let nativeFetch;

beforeEach(() => {
  nativeFetch = window.fetch;

  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 'ENced3ee3ef1504a758fc26ea34b604996',
              type: 'environments',
              attributes: {
                archive: false,
                created_at: '2022-06-02T22:00:24.187Z',
                library_path: 'b1aafd45ccc1/633b0e550bf6',
                library_name: 'launch-a95bf55ef64e.min.js',
                library_entry_points: [
                  {
                    library_name: 'launch-a95bf55ef64e.min.js',
                    minified: true,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-a95bf55ef64e.min.js'
                    ],
                    license_path:
                      'b1aafd45ccc1/633b0e550bf6/launch-a95bf55ef64e.js'
                  },
                  {
                    library_name: 'launch-a95bf55ef64e.js',
                    minified: false,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-a95bf55ef64e.js'
                    ]
                  }
                ],
                name: 'Production',
                path: null,
                stage: 'production',
                updated_at: '2025-04-08T15:22:27.320Z',
                status: 'succeeded',
                token: 'a95bf55ef64e',
                created_by_email: 'ciltaru@adobe.com',
                created_by_display_name: 'George Ciltaru',
                updated_by_email: 'ciltaru@adobe.com',
                updated_by_display_name: 'George Ciltaru',
                unapplied_changes: false
              },
              relationships: {
                library: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/library'
                  },
                  data: null
                },
                adobe_certificate: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/adobe_certificate',
                    self: 'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/relationships/adobe_certificate'
                  },
                  data: null
                },
                builds: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/builds'
                  }
                },
                host: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/host',
                    self: 'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/relationships/host'
                  },
                  data: {
                    id: 'HTd2ab639bc5734c02a5a259587f97a958',
                    type: 'hosts'
                  }
                },
                property: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996/property'
                  },
                  data: {
                    id: 'PR65e0646cad2346fdbd4bfb229532ac59',
                    type: 'properties'
                  }
                }
              },
              links: {
                property:
                  'https://reactor-engd.adobe.io/properties/PR65e0646cad2346fdbd4bfb229532ac59',
                self: 'https://reactor-engd.adobe.io/environments/ENced3ee3ef1504a758fc26ea34b604996'
              },
              meta: {
                archive_encrypted: false
              }
            },
            {
              id: 'EN37a50054443e4d92867d38790b3432e5',
              type: 'environments',
              attributes: {
                archive: false,
                created_at: '2022-06-02T22:00:24.110Z',
                library_path: 'b1aafd45ccc1/633b0e550bf6',
                library_name: 'launch-2dcfa1835f39-staging.min.js',
                library_entry_points: [
                  {
                    library_name: 'launch-2dcfa1835f39-staging.min.js',
                    minified: true,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-2dcfa1835f39-staging.min.js'
                    ],
                    license_path:
                      'b1aafd45ccc1/633b0e550bf6/launch-2dcfa1835f39-staging.js'
                  },
                  {
                    library_name: 'launch-2dcfa1835f39-staging.js',
                    minified: false,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-2dcfa1835f39-staging.js'
                    ]
                  }
                ],
                name: 'Staging',
                path: null,
                stage: 'staging',
                updated_at: '2025-04-08T15:22:27.351Z',
                status: 'succeeded',
                token: '2dcfa1835f39',
                created_by_email: 'ciltaru@adobe.com',
                created_by_display_name: 'George Ciltaru',
                updated_by_email: 'ciltaru@adobe.com',
                updated_by_display_name: 'George Ciltaru',
                unapplied_changes: false
              },
              relationships: {
                library: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/library'
                  },
                  data: null
                },
                adobe_certificate: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/adobe_certificate',
                    self: 'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/relationships/adobe_certificate'
                  },
                  data: null
                },
                builds: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/builds'
                  }
                },
                host: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/host',
                    self: 'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/relationships/host'
                  },
                  data: {
                    id: 'HTd2ab639bc5734c02a5a259587f97a958',
                    type: 'hosts'
                  }
                },
                property: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5/property'
                  },
                  data: {
                    id: 'PR65e0646cad2346fdbd4bfb229532ac59',
                    type: 'properties'
                  }
                }
              },
              links: {
                property:
                  'https://reactor-engd.adobe.io/properties/PR65e0646cad2346fdbd4bfb229532ac59',
                self: 'https://reactor-engd.adobe.io/environments/EN37a50054443e4d92867d38790b3432e5'
              },
              meta: {
                archive_encrypted: false
              }
            },
            {
              id: 'EN341385718d3b4007ac810d2313b891d3',
              type: 'environments',
              attributes: {
                archive: false,
                created_at: '2022-06-02T22:00:24.033Z',
                library_path: 'b1aafd45ccc1/633b0e550bf6',
                library_name: 'launch-0cafd3aaa980-development.min.js',
                library_entry_points: [
                  {
                    library_name: 'launch-0cafd3aaa980-development.min.js',
                    minified: true,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-0cafd3aaa980-development.min.js'
                    ],
                    license_path:
                      'b1aafd45ccc1/633b0e550bf6/launch-0cafd3aaa980-development.js'
                  },
                  {
                    library_name: 'launch-0cafd3aaa980-development.js',
                    minified: false,
                    references: [
                      'b1aafd45ccc1/633b0e550bf6/launch-0cafd3aaa980-development.js'
                    ]
                  }
                ],
                name: 'Development',
                path: null,
                stage: 'development',
                updated_at: '2025-04-08T15:36:59.406Z',
                status: 'succeeded',
                token: '0cafd3aaa980',
                created_by_email: 'ciltaru@adobe.com',
                created_by_display_name: 'George Ciltaru',
                updated_by_email: 'roan@adobe.com',
                updated_by_display_name: 'spencer roan',
                unapplied_changes: false
              },
              relationships: {
                library: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/library'
                  },
                  data: {
                    id: 'LB1f577734809747b49a5f828f09cba2b8',
                    type: 'libraries'
                  }
                },
                adobe_certificate: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/adobe_certificate',
                    self: 'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/relationships/adobe_certificate'
                  },
                  data: {
                    id: 'CE5bf4cd1dd96c411db1f1f47bf72ab5e1',
                    type: 'certificates'
                  }
                },
                builds: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/builds'
                  }
                },
                host: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/host',
                    self: 'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/relationships/host'
                  },
                  data: {
                    id: 'HTd2ab639bc5734c02a5a259587f97a958',
                    type: 'hosts'
                  }
                },
                property: {
                  links: {
                    related:
                      'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3/property'
                  },
                  data: {
                    id: 'PR65e0646cad2346fdbd4bfb229532ac59',
                    type: 'properties'
                  }
                }
              },
              links: {
                property:
                  'https://reactor-engd.adobe.io/properties/PR65e0646cad2346fdbd4bfb229532ac59',
                self: 'https://reactor-engd.adobe.io/environments/EN341385718d3b4007ac810d2313b891d3'
              },
              meta: {
                archive_encrypted: false
              }
            }
          ],
          included: [
            {
              id: 'CE5bf4cd1dd96c411db1f1f47bf72ab5e1',
              type: 'certificates',
              attributes: {
                created_at: '2025-04-04T21:46:53.286Z',
                expires_at: '2026-04-28T23:59:59.000Z',
                display_name: 'Adobe Development Certificate',
                stage: 'development',
                status: 'current',
                variable_name: 'ADOBE_MTLS_CERTIFICATE',
                version: 'a5fe5c03dbd346d3827e07b7fe76d1a3',
                updated_at: '2025-04-04T21:46:54.120Z'
              },
              links: {
                self: 'https://reactor-engd.adobe.io/certificates/CE5bf4cd1dd96c411db1f1f47bf72ab5e1'
              }
            }
          ],
          meta: {
            pagination: {
              current_page: 1,
              next_page: null,
              prev_page: null,
              total_pages: 1,
              total_count: 3
            }
          }
        })
    })
  );

  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
  window.fetch = nativeFetch;
});

const getTextFieldByLabel = (label) => screen.getByLabelText(label);

const getFromFields = () => ({
  methodSelect: screen.getByLabelText(/method/i, { selector: 'button' }),
  urlInput: screen.queryByLabelText(/url/i),
  addAnotherButton: screen.queryByRole('button', { name: /add another/i }),
  queryParamsTab: screen.getByText(/query parameters/i, {
    selector: 'div[role="tablist"] span'
  }),
  headersTab: screen.getByText(/headers/i, {
    selector: 'div[role="tablist"] span'
  }),
  bodyTab: screen.queryByText(/^body$/i, {
    selector: 'div[role="tablist"] span'
  }),
  bodyRawInput: screen.queryByLabelText('Body (Raw)'),
  bodyRawCheckbox: screen.queryByLabelText('Raw'),
  bodyJsonCheckbox: screen.queryByLabelText('JSON Key-Value Pairs Editor'),
  saveResponseCheckbox: screen.queryByLabelText('Save the request response'),
  responseKeyInput: screen.queryByLabelText(/response key/i)
});

describe('Send data view', () => {
  test('sets form values from settings', async () => {
    renderView(SendData);

    await act(async () => {
      await extensionBridge.init({
        settings: {
          method: 'POST',
          url: 'http://www.google.com?a=b',
          headers: [
            {
              key: 'c',
              value: 'd'
            }
          ],
          body: {
            e: 'f'
          },
          responseKey: 'keyName'
        }
      });
    });

    const {
      methodSelect,
      urlInput,
      headersTab,
      bodyTab,
      responseKeyInput,
      saveResponseCheckbox
    } = getFromFields();

    expect(methodSelect).toHaveTextContent('POST');
    expect(urlInput.value).toBe('http://www.google.com?a=b');

    const queryKeyInput = getTextFieldByLabel('Query Param Key 0');
    const queryValueInput = getTextFieldByLabel('Query Param Value 0');

    expect(queryKeyInput.value).toBe('a');
    expect(queryValueInput.value).toBe('b');

    expect(responseKeyInput.value).toBe('keyName');
    expect(saveResponseCheckbox).toBeChecked();

    await click(headersTab);

    const headerKeyInput = getTextFieldByLabel('Header Key 0');
    const headerValueInput = getTextFieldByLabel('Header Value 0');

    expect(headerKeyInput.value).toBe('c');
    expect(headerValueInput.value).toBe('d');

    await click(bodyTab);

    const { bodyJsonCheckbox } = getFromFields();
    await click(bodyJsonCheckbox);

    const bodyKeyInput = getTextFieldByLabel('Body JSON Key 0');
    const bodyValueInput = getTextFieldByLabel('Body JSON Value 0');

    expect(bodyKeyInput.value).toBe('e');
    expect(bodyValueInput.value).toBe('f');
  });

  test('sets body raw form value from settings', async () => {
    renderView(SendData);

    await act(async () => {
      extensionBridge.init({
        settings: {
          method: 'POST',
          body: '{"e":"f"}'
        }
      });
    });

    const { bodyTab } = getFromFields();
    await click(bodyTab);

    const { bodyRawInput } = getFromFields();
    expect(bodyRawInput.value).toBe('{"e":"f"}');
  });

  test('sets settings from form values', async () => {
    renderView(SendData);

    await act(async () => {
      extensionBridge.init({
        settings: {
          method: 'POST',
          url: 'http://www.google.com?a=b',
          headers: [
            {
              key: 'c',
              value: 'd'
            }
          ],
          body: {
            e: 'f'
          }
        }
      });
    });

    const {
      methodSelect,
      urlInput,
      headersTab,
      bodyTab,
      saveResponseCheckbox
    } = getFromFields();

    await changeInputValue(urlInput, 'http://www.anothergoogle.com?a=b');
    await changePickerValue(methodSelect, 'PUT');

    const queryKeyInput = getTextFieldByLabel('Query Param Key 0');
    const queryValueInput = getTextFieldByLabel('Query Param Value 0');

    await changeInputValue(queryKeyInput, 'aa');
    await changeInputValue(queryValueInput, 'bb');

    await click(headersTab);

    const headerKeyInput = getTextFieldByLabel('Header Key 0');
    const headerValueInput = getTextFieldByLabel('Header Value 0');

    await changeInputValue(headerKeyInput, 'cc');
    await changeInputValue(headerValueInput, 'dd');

    await click(bodyTab);

    const { bodyJsonCheckbox } = getFromFields();
    await click(bodyJsonCheckbox);

    const bodyKeyInput = getTextFieldByLabel('Body JSON Key 0');
    const bodyValueInput = getTextFieldByLabel('Body JSON Value 0');

    await changeInputValue(bodyKeyInput, 'ee');
    await changeInputValue(bodyValueInput, 'ff');

    await click(saveResponseCheckbox);

    const { responseKeyInput } = getFromFields();
    await changeInputValue(responseKeyInput, 'keyName');

    expect(extensionBridge.getSettings()).toStrictEqual({
      method: 'PUT',
      url: 'http://www.anothergoogle.com?aa=bb',
      headers: [
        {
          key: 'cc',
          value: 'dd'
        }
      ],
      body: {
        ee: 'ff'
      },
      responseKey: 'keyName'
    });
  }, 10000);

  test('sets settings from body raw value', async () => {
    renderView(SendData);

    await act(async () => {
      extensionBridge.init({
        settings: {
          method: 'POST',
          body: '{"e":"f"}'
        }
      });
    });

    const { bodyTab } = getFromFields();
    await click(bodyTab);

    const { bodyRawInput } = getFromFields();
    await changeInputValue(bodyRawInput, '{{"ee":"ff"}');

    expect(extensionBridge.getSettings()).toEqual({
      method: 'POST',
      url: '',
      body: { ee: 'ff' }
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendData);

    await act(async () => {
      extensionBridge.init({
        settings: {
          method: 'POST',
          url: 'http://www.google.com?a=b',
          headers: [
            {
              key: 'c',
              value: 'd'
            }
          ],
          body: {
            e: 'f'
          }
        }
      });
    });

    const { headersTab, bodyTab, urlInput } = getFromFields();

    // Check URL input
    expect(urlInput).not.toHaveAttribute('aria-invalid', 'true');

    // Check URL empty case
    await changeInputValue(urlInput, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(urlInput).toHaveAttribute('aria-invalid', 'true');

    // Check URL invalid case
    await changeInputValue(urlInput, 'gigi');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(urlInput).toHaveAttribute('aria-invalid', 'true');

    // Check HEADERS Section
    await click(headersTab);

    const { addAnotherButton } = getFromFields();
    await click(addAnotherButton);

    let headersKeyInput0 = getTextFieldByLabel('Header Key 0');
    let headersValueInput0 = getTextFieldByLabel('Header Value 0');

    const headersKeyInput1 = getTextFieldByLabel('Header Key 1');
    const headersValueInput1 = getTextFieldByLabel('Header Value 1');

    // Check fields are not already invalid.
    expect(headersKeyInput0).not.toHaveAttribute('aria-invalid');
    expect(headersValueInput0).not.toHaveAttribute('aria-invalid');
    expect(headersKeyInput1).not.toHaveAttribute('aria-invalid');
    expect(headersValueInput1).not.toHaveAttribute('aria-invalid');

    // Validate case when header key is empty and value is not.
    await changeInputValue(headersKeyInput0, '');

    await act(async () => {
      extensionBridge.validate();
    });

    headersKeyInput0 = getTextFieldByLabel('Header Key 0');
    headersValueInput0 = getTextFieldByLabel('Header Value 0');

    expect(headersKeyInput0).toHaveAttribute('aria-invalid', 'true');
    expect(headersValueInput0).not.toHaveAttribute('aria-invalid');

    // Check BODY Section
    await click(bodyTab);

    const { bodyJsonCheckbox } = getFromFields();
    await click(bodyJsonCheckbox);

    const { addAnotherButton: addAnotherButton2 } = getFromFields();
    await click(addAnotherButton2);

    let bodyJsonPairsKeyInput0 = getTextFieldByLabel('Body JSON Key 0');
    let bodyJsonPairsValueInput0 = getTextFieldByLabel('Body JSON Value 0');

    const bodyJsonPairsKeyInput1 = getTextFieldByLabel('Body JSON Key 1');
    const bodyJsonPairsValueInput1 = getTextFieldByLabel('Body JSON Value 1');

    // Check fields are not already invalid.
    expect(bodyJsonPairsKeyInput0).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsValueInput0).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsKeyInput1).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsValueInput1).not.toHaveAttribute('aria-invalid');

    // Validate case when header key is empty and value is not.
    await changeInputValue(bodyJsonPairsKeyInput0, '');

    await act(async () => {
      extensionBridge.validate();
    });

    bodyJsonPairsKeyInput0 = getTextFieldByLabel('Body JSON Key 0');
    bodyJsonPairsValueInput0 = getTextFieldByLabel('Body JSON Value 0');
    expect(bodyJsonPairsKeyInput0).toHaveAttribute('aria-invalid', 'true');
    expect(bodyJsonPairsValueInput0).not.toHaveAttribute('aria-invalid');
  });

  describe('query params editor', () => {
    test('allows you to add a new row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            url: 'http://www.google.com?a=b'
          }
        });
      });

      const { addAnotherButton } = getFromFields();
      await click(addAnotherButton);

      const keyInput = getTextFieldByLabel('Query Param Key 1');
      const valueInput = getTextFieldByLabel('Query Param Value 1');

      await changeInputValue(keyInput, 'c');
      await changeInputValue(valueInput, 'd');

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: 'http://www.google.com?a=b&c=d'
      });
    });

    test('allows you to delete a row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            url: 'http://www.google.com?a=b&c=d'
          }
        });
      });

      const deleteButton = getTextFieldByLabel('Delete Query Param 1');
      await click(deleteButton);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: 'http://www.google.com?a=b'
      });
    });
  });

  describe('headers editor', () => {
    test('allows you to add a new row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'GET',
            url: '',
            headers: [
              {
                key: 'a',
                value: 'b'
              }
            ]
          }
        });
      });

      const { headersTab } = getFromFields();
      await click(headersTab);

      const { addAnotherButton } = getFromFields();
      await click(addAnotherButton);

      const keyInput = getTextFieldByLabel('Header Key 1');
      const valueInput = getTextFieldByLabel('Header Value 1');

      await changeInputValue(keyInput, 'c');
      await changeInputValue(valueInput, 'd');

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: '',
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
      });
    });

    test('allows you to delete a row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'GET',
            url: '',
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
          }
        });
      });

      const { headersTab } = getFromFields();
      await click(headersTab);

      const deleteButton = getTextFieldByLabel('Delete Header 1');
      await click(deleteButton);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: '',
        headers: [
          {
            key: 'a',
            value: 'b'
          }
        ]
      });
    });
  });

  describe('body editor', () => {
    test('allows you to add a new row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'POST',
            url: '',
            body: {
              a: 'b'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();
      await click(bodyTab);

      const { bodyJsonCheckbox } = getFromFields();
      await click(bodyJsonCheckbox);

      const { addAnotherButton } = getFromFields();
      await click(addAnotherButton);

      const keyInput = getTextFieldByLabel('Body JSON Key 1');
      const valueInput = getTextFieldByLabel('Body JSON Value 1');

      await changeInputValue(keyInput, 'c');
      await changeInputValue(valueInput, 'd');

      expect(extensionBridge.getSettings()).toEqual({
        method: 'POST',
        url: '',
        body: {
          a: 'b',
          c: 'd'
        }
      });
    });

    test('allows you to delete a row', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'POST',
            url: '',
            body: {
              a: 'b',
              c: 'd'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();
      await click(bodyTab);

      const { bodyJsonCheckbox } = getFromFields();
      await click(bodyJsonCheckbox);

      const deleteButton = getTextFieldByLabel('Delete Body JSON 1');
      await click(deleteButton);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'POST',
        url: '',
        body: {
          a: 'b'
        }
      });
    });

    test('returns the same JSON data when changing editor modes', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'POST',
            url: '',
            body: {
              a: 'b',
              c: 'd'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();
      await click(bodyTab);

      const { bodyJsonCheckbox } = getFromFields();
      await click(bodyJsonCheckbox);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'POST',
        url: '',
        body: { a: 'b', c: 'd' }
      });
    });

    test('does not lose the non JSON raw body when switching editor modes', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'POST',
            url: '',
            body: '{a:"b",c:"d"}a'
          }
        });
      });

      const { bodyTab } = getFromFields();
      await click(bodyTab);

      const { bodyJsonCheckbox } = getFromFields();
      await click(bodyJsonCheckbox);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'POST',
        url: ''
      });

      const { bodyRawCheckbox } = getFromFields();
      await click(bodyRawCheckbox);

      expect(extensionBridge.getSettings()).toEqual({
        method: 'POST',
        url: '',
        body: '{a:"b",c:"d"}a'
      });
    });

    test('is not visible for GET requests', async () => {
      renderView(SendData);

      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'POST',
            url: '',
            body: '{a:"b",c:"d"}'
          }
        });
      });

      let { bodyTab, methodSelect } = getFromFields();
      await click(bodyTab);

      await changePickerValue(methodSelect, 'GET');

      ({ bodyTab } = getFromFields());
      expect(bodyTab).toBeNull();
    });
  });
});
