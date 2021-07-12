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

/* eslint-disable no-template-curly-in-string */

import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderView from '../../__tests_helpers__/renderView';
import {
  changePickerValue,
  inputOnChange
} from '../../__tests_helpers__/jsDomHelpers';

import SendData from '../sendData';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getTextFieldByLabel = (label) => screen.getByLabelText(label);

const getFromFields = () => ({
  methodSelect: screen.getByLabelText(/method/i, { selector: 'button' }),
  urlInput: screen.queryByLabelText(/url/i),
  addAnotherButton: screen.queryByRole('button', { name: /add another/i }),
  queryParamsTab: screen.getByText(/query params/i, { selector: 'span' }),
  headersTab: screen.getByText(/headers/i, { selector: 'span' }),
  bodyTab: screen.getByText(/^body$/i, { selector: 'span' }),
  bodyRawInput: screen.queryByLabelText('Body (Raw)'),
  bodyRawCheckbox: screen.queryByLabelText('Raw'),
  saveResponseCheckbox: screen.queryByLabelText('Save the request response'),
  responseKeyInput: screen.queryByLabelText(/response key/i)
});

describe('Send data view', () => {
  beforeEach(() => {
    renderView(SendData);
  });

  test('sets form values from settings', async () => {
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

    await act(async () => {
      fireEvent.click(headersTab);
    });

    const headerKeyInput = getTextFieldByLabel('Header Key 0');
    const headerValueInput = getTextFieldByLabel('Header Value 0');

    expect(headerKeyInput.value).toBe('c');
    expect(headerValueInput.value).toBe('d');

    await act(async () => {
      fireEvent.click(bodyTab);
    });

    const bodyKeyInput = getTextFieldByLabel('Body JSON Key 0');
    const bodyValueInput = getTextFieldByLabel('Body JSON Value 0');

    expect(bodyKeyInput.value).toBe('e');
    expect(bodyValueInput.value).toBe('f');
  });

  test('sets body raw form value from settings', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          body: '{"e":"f"}'
        }
      });
    });

    const { bodyTab } = getFromFields();

    await act(async () => {
      fireEvent.click(bodyTab);
    });

    const { bodyRawInput } = getFromFields();

    expect(bodyRawInput.value).toBe('{"e":"f"}');
  });

  test('sets settings from form values', async () => {
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

    await act(async () => {
      inputOnChange(urlInput, 'http://www.anothergoogle.com?a=b');
      changePickerValue(methodSelect, 'PUT');
    });

    const queryKeyInput = getTextFieldByLabel('Query Param Key 0');
    const queryValueInput = getTextFieldByLabel('Query Param Value 0');

    await act(async () => {
      inputOnChange(queryKeyInput, 'aa');
      inputOnChange(queryValueInput, 'bb');
    });

    await act(async () => {
      fireEvent.click(headersTab);
    });

    const headerKeyInput = getTextFieldByLabel('Header Key 0');
    const headerValueInput = getTextFieldByLabel('Header Value 0');

    await act(async () => {
      inputOnChange(headerKeyInput, 'cc');
      inputOnChange(headerValueInput, 'dd');
    });

    await act(async () => {
      fireEvent.click(bodyTab);
    });

    const bodyKeyInput = getTextFieldByLabel('Body JSON Key 0');
    const bodyValueInput = getTextFieldByLabel('Body JSON Value 0');

    await act(async () => {
      inputOnChange(bodyKeyInput, 'ee');
      inputOnChange(bodyValueInput, 'ff');
    });

    await act(async () => {
      fireEvent.click(saveResponseCheckbox);
    });

    const { responseKeyInput } = getFromFields();
    await act(async () => {
      inputOnChange(responseKeyInput, 'keyName');
    });

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
  });

  test('sets settings from body raw value', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          body: '{"e":"f"}'
        }
      });
    });

    const { bodyTab } = getFromFields();

    await act(async () => {
      fireEvent.click(bodyTab);
    });

    const { bodyRawInput } = getFromFields();

    await act(async () => {
      inputOnChange(bodyRawInput, '{"ee":"ff"}');
    });

    expect(extensionBridge.getSettings()).toEqual({
      method: 'GET',
      url: '',
      body: '{"ee":"ff"}'
    });
  });

  test('handles form validation correctly', async () => {
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
    inputOnChange(urlInput, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(urlInput).toHaveAttribute('aria-invalid', 'true');

    // Check URL invalid case
    inputOnChange(urlInput, 'gigi');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(urlInput).toHaveAttribute('aria-invalid', 'true');

    // Check HEADERS Section
    await act(async () => {
      fireEvent.click(headersTab);
    });

    await act(async () => {
      const { addAnotherButton } = getFromFields();
      fireEvent.click(addAnotherButton);
    });

    const headersKeyInput0 = getTextFieldByLabel('Header Key 0');
    const headersValueInput0 = getTextFieldByLabel('Header Value 0');

    const headersKeyInput1 = getTextFieldByLabel('Header Key 1');
    const headersValueInput1 = getTextFieldByLabel('Header Value 1');

    // Check fields are not already invalid.
    expect(headersKeyInput0).not.toHaveAttribute('aria-invalid');
    expect(headersValueInput0).not.toHaveAttribute('aria-invalid');
    expect(headersKeyInput1).not.toHaveAttribute('aria-invalid');
    expect(headersValueInput1).not.toHaveAttribute('aria-invalid');

    // Validate case when header key is empty and value is not.
    inputOnChange(headersKeyInput0, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(headersKeyInput0).toHaveAttribute('aria-invalid', 'true');
    expect(headersValueInput0).not.toHaveAttribute('aria-invalid');

    // Check BODY Section
    await act(async () => {
      fireEvent.click(bodyTab);
    });

    await act(async () => {
      const { addAnotherButton } = getFromFields();
      fireEvent.click(addAnotherButton);
    });

    const bodyJsonPairsKeyInput0 = getTextFieldByLabel('Body JSON Key 0');
    const bodyJsonPairsValueInput0 = getTextFieldByLabel('Body JSON Value 0');

    const bodyJsonPairsKeyInput1 = getTextFieldByLabel('Body JSON Key 1');
    const bodyJsonPairsValueInput1 = getTextFieldByLabel('Body JSON Value 1');

    // Check fields are not already invalid.
    expect(bodyJsonPairsKeyInput0).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsValueInput0).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsKeyInput1).not.toHaveAttribute('aria-invalid');
    expect(bodyJsonPairsValueInput1).not.toHaveAttribute('aria-invalid');

    // Validate case when header key is empty and value is not.
    inputOnChange(bodyJsonPairsKeyInput0, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(bodyJsonPairsKeyInput0).toHaveAttribute('aria-invalid', 'true');
    expect(bodyJsonPairsValueInput0).not.toHaveAttribute('aria-invalid');
  });

  describe('query params editor', () => {
    test('allows you to add a new row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            url: 'http://www.google.com?a=b'
          }
        });
      });

      await act(async () => {
        const { addAnotherButton } = getFromFields();
        fireEvent.click(addAnotherButton);
      });

      await act(async () => {
        const keyInput = getTextFieldByLabel('Query Param Key 1');
        const valueInput = getTextFieldByLabel('Query Param Value 1');

        inputOnChange(keyInput, 'c');
        inputOnChange(valueInput, 'd');
      });

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: 'http://www.google.com?a=b&c=d'
      });
    });

    test('allows you to delete a row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            url: 'http://www.google.com?a=b&c=d'
          }
        });
      });

      const deleteButton = getTextFieldByLabel('Delete Query Param 1');
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: 'http://www.google.com?a=b'
      });
    });
  });

  describe('headers editor', () => {
    test('allows you to add a new row', async () => {
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

      await act(async () => {
        fireEvent.click(headersTab);
      });

      await act(async () => {
        const { addAnotherButton } = getFromFields();
        fireEvent.click(addAnotherButton);
      });

      await act(async () => {
        const keyInput = getTextFieldByLabel('Header Key 1');
        const valueInput = getTextFieldByLabel('Header Value 1');

        inputOnChange(keyInput, 'c');
        inputOnChange(valueInput, 'd');
      });

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

      await act(async () => {
        fireEvent.click(headersTab);
      });

      const deleteButton = getTextFieldByLabel('Delete Header 1');
      await act(async () => {
        fireEvent.click(deleteButton);
      });

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
      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'GET',
            url: '',
            body: {
              a: 'b'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();

      await act(async () => {
        fireEvent.click(bodyTab);
      });

      await act(async () => {
        const { addAnotherButton } = getFromFields();
        fireEvent.click(addAnotherButton);
      });

      await act(async () => {
        const keyInput = getTextFieldByLabel('Body JSON Key 1');
        const valueInput = getTextFieldByLabel('Body JSON Value 1');

        inputOnChange(keyInput, 'c');
        inputOnChange(valueInput, 'd');
      });

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: '',
        body: {
          a: 'b',
          c: 'd'
        }
      });
    });

    test('allows you to delete a row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'GET',
            url: '',
            body: {
              a: 'b',
              c: 'd'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();

      await act(async () => {
        fireEvent.click(bodyTab);
      });

      const deleteButton = getTextFieldByLabel('Delete Body JSON 1');
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: '',
        body: {
          a: 'b'
        }
      });
    });

    test('allows you to switch between JSON editor and raw editor', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            method: 'GET',
            url: '',
            body: {
              a: 'b',
              c: 'd'
            }
          }
        });
      });

      const { bodyTab } = getFromFields();

      await act(async () => {
        fireEvent.click(bodyTab);
      });

      const { bodyRawCheckbox } = getFromFields();

      await act(async () => {
        fireEvent.click(bodyRawCheckbox);
      });

      expect(extensionBridge.getSettings()).toEqual({
        method: 'GET',
        url: '',
        body: '{"a":"b","c":"d"}'
      });
    });
  });
});
