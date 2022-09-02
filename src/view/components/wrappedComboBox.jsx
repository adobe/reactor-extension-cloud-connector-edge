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
import { useFormContext, Controller } from 'react-hook-form';
import { ActionButton, ComboBox, Item } from '@adobe/react-spectrum';
import { useTreeData } from 'react-stately';
import Data from '@spectrum-icons/workflow/Data';
import ValidationWrapper from './validationWrapper';

const addDataElementToken = (value, dataElementToken) =>
  `${value || ''}${dataElementToken}`;

const openDataElementSelector = (tokenize, fieldState, onInputChange) => () => {
  // Whenever we're dealing with a data element token, we add it to whatever the existing value
  // is. If we're not dealing with a token, we replace the value entirely. This is just due
  // to how we want the UX to flow.
  window.extensionBridge
    .openDataElementSelector({
      tokenize
    })
    .then((dataElement) => {
      const newValue = tokenize
        ? addDataElementToken(fieldState.inputValue, dataElement)
        : dataElement;

      onInputChange(newValue);
    });
};

export default function WrappedComboBoxField({
  name: componentName,
  onSelectionChange: componentOnSelectionChange,
  onInputChange: componentOnInputChange,
  onBlur: componentOnBlur,
  supportDataElement,
  defaultValue = '',
  defaultItems = [],
  width = 'auto',
  ...rest
}) {
  const methods = useFormContext();
  const hasLabel = Boolean(rest.label);
  const { watch } = methods;

  const list = useTreeData({
    initialItems: defaultItems
  });

  const initialValue = watch(componentName);

  const [fieldState, setFieldState] = React.useState({
    selectedKey: list.getItem(initialValue)?.value.id || '',
    inputValue: initialValue
  });

  return (
    <Controller
      name={componentName}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, name, ref } }) => {
        const onInputChange = (v) => {
          setFieldState((prevState) => ({
            inputValue: v,
            selectedKey: v === '' ? null : prevState.selectedKey
          }));

          onChange(v);

          if (componentOnInputChange) {
            componentOnInputChange(v);
          }
        };

        return (
          <ValidationWrapper width={width}>
            <ComboBox
              {...rest}
              width={width}
              ref={ref}
              name={name}
              onBlur={(e) => {
                onBlur(e);
                if (componentOnBlur) {
                  componentOnBlur(e);
                }
              }}
              defaultItems={list.items}
              selectedKey={fieldState.selectedKey}
              inputValue={fieldState.inputValue}
              onSelectionChange={(key) => {
                setFieldState((prevState) => {
                  return {
                    inputValue:
                      list.getItem(key)?.value.name ??
                      (rest.allowsCustomValue ? prevState.inputValue : ''),
                    selectedKey: key
                  };
                });

                onChange(fieldState.inputValue);

                if (componentOnSelectionChange) {
                  componentOnSelectionChange(key);
                }
              }}
              onInputChange={onInputChange}
            >
              {(item) => <Item>{item.value.name}</Item>}
            </ComboBox>

            {supportDataElement && (
              <ActionButton
                aria-label="Open data element selector"
                marginStart="size-65"
                marginTop={hasLabel ? 'size-300' : ''}
                onPress={openDataElementSelector(
                  supportDataElement,
                  fieldState,
                  onInputChange
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
