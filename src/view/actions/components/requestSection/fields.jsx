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
import { Controller, useFormContext } from 'react-hook-form';
import { Flex, Heading, Picker, Item, View } from '@adobe/react-spectrum';

import WrappedTextField from '../../../components/wrappedTextField';
import getQueryParamsFromUrl from '../../../utils/getQueryParamsFromUrl';
import getEmptyQueryParam from '../queryParamsSection/getEmptyValue';

const parseQueryParams = (setValue, v) => {
  const queryParams = getQueryParamsFromUrl(v);
  if (queryParams.length === 0) {
    queryParams.push(getEmptyQueryParam());
  }

  setValue('queryParams', queryParams, {
    shouldValidate: false,
    shouldDirty: false
  });
};

export default function RequestSectionFields({ onMethodUpdate }) {
  const { setValue, control } = useFormContext();

  return (
    <>
      <Heading level="3">Request</Heading>

      <Flex gap="size-100" width="100%">
        <Controller
          control={control}
          name="method"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              label="Method"
              minWidth="size-2000"
              isRequired
              necessityIndicator="label"
              selectedKey={value}
              items={[
                {
                  id: 'GET',
                  name: 'GET'
                },
                {
                  id: 'POST',
                  name: 'POST'
                },
                {
                  id: 'PUT',
                  name: 'PUT'
                },
                {
                  id: 'PATCH',
                  name: 'PATCH'
                },
                {
                  id: 'DELETE',
                  name: 'DELETE'
                }
              ]}
              onSelectionChange={(v) => {
                onChange(v);
                onMethodUpdate(v);
              }}
              onBlur={onBlur}
            >
              {(item) => <Item>{item.name}</Item>}
            </Picker>
          )}
        />

        <View flex>
          <WrappedTextField
            minWidth="size-6000"
            width="100%"
            name="url"
            label="URL"
            isRequired
            necessityIndicator="label"
            description="Enter request URL (eg. http://example.com/path?q=true)."
            onChange={(v) => parseQueryParams(setValue, v)}
          />
        </View>
      </Flex>
    </>
  );
}
