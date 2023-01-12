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
import {
  Button,
  Divider,
  Flex,
  Heading,
  View,
  Text
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import { useFieldArray } from 'react-hook-form';
import row from './row';
import getEmptyHeader from './getEmptyValue';

export default function HeadersSectionFields() {
  const { fields, append, remove } = useFieldArray({
    name: 'headers'
  });

  return (
    <>
      <Flex direction="column" gap="size-100" marginTop="size-100">
        <Flex direction="row" gap="size-200">
          <View flex>
            <Heading
              level="5"
              marginStart="size-100"
              marginTop="size-100"
              marginBottom="size-50"
            >
              NAME
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
        onPress={() => append(getEmptyHeader())}
      >
        <Add />
        <Text>Add Another</Text>
      </Button>
    </>
  );
}
