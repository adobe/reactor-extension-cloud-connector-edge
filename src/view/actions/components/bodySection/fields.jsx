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

import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  Flex,
  Heading,
  RadioGroup,
  Radio,
  TextArea,
  Divider,
  View,
  Text
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import row from './row';
import getEmptyBodyJson from './getEmptyValue';
import WrappedTextField from '../../../components/wrappedTextField';
import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../../utils/entityVariablesConverter';

export default () => {
  const { control, setValue, watch } = useFormContext();
  const [bodyType, bodyRaw, bodyJsonPairs] = watch([
    'bodyType',
    'bodyRaw',
    'bodyJsonPairs'
  ]);

  const { fields, append, remove } = useFieldArray({
    name: 'bodyJsonPairs'
  });

  return (
    <>
      <Controller
        control={control}
        name="bodyType"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            marginTop="size-250"
            label="Body Format"
            value={value}
            onChange={(v) => {
              onChange(v);

              // Auto Update Body Content
              if (v === 'object') {
                let variables = [];
                try {
                  variables = addToVariablesFromEntity([], JSON.parse(bodyRaw));
                } catch (e) {
                  // Don't do anything
                }

                if (variables.length === 0) {
                  variables.push(getEmptyBodyJson());
                }

                setValue('bodyJsonPairs', variables, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              } else {
                let entity = JSON.stringify(
                  addToEntityFromVariables({}, bodyJsonPairs)
                );

                if (entity === '{}') {
                  entity = '';
                }

                setValue('bodyRaw', entity, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }
              // END: Auto Update Body Content
            }}
          >
            <Flex>
              <Radio value="object">JSON</Radio>
              <Radio value="raw">Raw</Radio>
            </Flex>
          </RadioGroup>
        )}
      />

      {bodyType === 'object' ? (
        <>
          <Heading level="3">Body (JSON)</Heading>
          <Divider size="M" />
          <Flex direction="column" gap="size-100">
            <Flex direction="row" gap="size-200">
              <View flex>
                <Heading
                  level="5"
                  marginStart="size-100"
                  marginTop="size-100"
                  marginBottom="size-50"
                >
                  KEY
                </Heading>
              </View>
              <View flex>
                <Heading
                  level="5"
                  marginStart="size-100"
                  marginTop="size-100"
                  marginBottom="size-50"
                >
                  VALUE
                </Heading>
              </View>
              <View width="size-450" />
            </Flex>
            <Divider size="S" />
            {fields.map(row.bind(null, remove))}
          </Flex>

          <Button
            marginTop="size-150"
            variant="primary"
            onPress={() => append(getEmptyBodyJson())}
          >
            <Add />
            <Text>Add Another</Text>
          </Button>
        </>
      ) : (
        <>
          <Heading level="3">Body (Raw)</Heading>
          <Divider size="M" marginBottom="size-150" />
          <WrappedTextField
            width="100%"
            component={TextArea}
            name="bodyRaw"
            aria-label="Body (Raw)"
            supportDataElement
          />
        </>
      )}
    </>
  );
};
