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
import Delete from '@spectrum-icons/workflow/Delete';
import { ActionButton, Flex, View } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';
import addQueryParamsToUrl from '../../../utils/addQueryParamsToUrl';

export default function QueryParamsSectionRow(
  remove,
  setValue,
  url,
  variable,
  index,
  variables
) {
  const { id, value, key } = variable;
  return (
    <Flex direction="row" gap="size-200" key={`queryParams${id}`}>
      <View flex>
        <WrappedTextField
          defaultValue={key}
          aria-label={`Query Param Key ${index}`}
          width="100%"
          name={`queryParams.${index}.key`}
          supportDataElement
          onChange={(v) => {
            const newQueryParams = variables.slice();
            newQueryParams[index].key = v;

            setValue('url', addQueryParamsToUrl(url, newQueryParams), {
              shouldValidate: true,
              shouldDirty: true
            });
          }}
        />
      </View>

      <View flex>
        <WrappedTextField
          aria-label={`Query Param Value ${index}`}
          defaultValue={value}
          width="100%"
          name={`queryParams.${index}.value`}
          supportDataElement
          onChange={(v) => {
            const newQueryParams = variables.slice();
            newQueryParams[index].value = v;

            setValue('url', addQueryParamsToUrl(url, newQueryParams), {
              shouldValidate: true,
              shouldDirty: true
            });
          }}
        />
      </View>

      <View width="size-450">
        {variables.length > 1 && (
          <ActionButton
            aria-label={`Delete Query Param ${index}`}
            isQuiet
            onPress={() => {
              remove(index);

              let newQueryParams = variables.slice();
              delete newQueryParams[index];
              newQueryParams = newQueryParams.filter((q) => q);

              setValue('url', addQueryParamsToUrl(url, newQueryParams), {
                shouldValidate: true,
                shouldDirty: true
              });
            }}
          >
            <Delete />
          </ActionButton>
        )}
      </View>
    </Flex>
  );
}
