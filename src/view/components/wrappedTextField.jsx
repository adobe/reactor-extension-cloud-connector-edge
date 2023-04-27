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

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Controller } from 'react-hook-form';
import { ActionButton, TextField } from '@adobe/react-spectrum';
import Data from '@spectrum-icons/workflow/Data';
import ValidationWrapper from './validationWrapper';

const addDataElementToken = (value, dataElementToken) =>
  `${value || ''}${dataElementToken}`;

const openDataElementSelector = (tokenize, value, onChange) => () => {
  // Whenever we're dealing with a data element token, we add it to whatever the existing value
  // is. If we're not dealing with a token, we replace the value entirely. This is just due
  // to how we want the UX to flow.
  window.extensionBridge
    .openDataElementSelector({
      tokenize
    })
    .then((dataElement) => {
      const newValue = tokenize
        ? addDataElementToken(value, dataElement)
        : dataElement;

      onChange(newValue);
    });
};

export default function WrappedTextField({
  component: Component = TextField,
  name: componentName,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  supportDataElement,
  defaultValue = '',
  width = 'auto',
  ...rest
}) {
  const hasLabel = Boolean(rest.label);

  return (
    <Controller
      name={componentName}
      defaultValue={defaultValue}
      render={({
        field: { onChange: reactFormOnChange, onBlur, name, value }
      }) => {
        const onChange = (v) => {
          reactFormOnChange(v);
          if (componentOnChange) {
            componentOnChange(v);
          }
        };

        return (
          <ValidationWrapper width={width}>
            <Component
              width={width}
              name={name}
              onBlur={(e) => {
                onBlur(e);
                if (componentOnBlur) {
                  componentOnBlur(e);
                }
              }}
              onChange={onChange}
              value={value}
              autoComplete="off"
              {...rest}
            />

            {supportDataElement && (
              <ActionButton
                aria-label="Open data element selector"
                marginTop={hasLabel ? 'size-300' : ''}
                marginStart="size-65"
                onPress={openDataElementSelector(
                  supportDataElement,
                  value,
                  onChange
                )}
              >
                <Data />
              </ActionButton>
            )}
          </ValidationWrapper>
        );
      }}
      {...rest}
    />
  );
}
