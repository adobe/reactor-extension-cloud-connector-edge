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
import WrappedComboBox from '../../../components/wrappedComboBox';

export default function HeadersSectionRow(remove, variable, index, variables) {
  const { id, value, key } = variable;

  return (
    <Flex direction="row" gap="size-200" key={`headers${id}`}>
      <View flex>
        <WrappedComboBox
          name={`headers.${index}.key`}
          aria-label={`Header Key ${index}`}
          defaultValue={key}
          supportDataElement
          width="100%"
          allowsCustomValue
          defaultItems={[
            'A-IM',
            'Accept',
            'Accept-Charset',
            'Accept-Encoding',
            'Accept-Language',
            'Accept-Datetime',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
            'Authorization',
            'Cache-Control',
            'Connection',
            'Content-Length',
            'Content-Type',
            'Cookie',
            'Date',
            'Expect',
            'Forwarded',
            'From',
            'Host',
            'If-Match',
            'If-Modified-Since',
            'If-None-Match',
            'If-Range',
            'If-Unmodified-Since',
            'Max-Forwards',
            'Origin',
            'Pragma',
            'Proxy-Authorization',
            'Range',
            'Referer',
            'TE',
            'User-Agent',
            'Upgrade',
            'Via',
            'Warning',
            'DNT',
            'X-Requested-With',
            'X-CSRF-Token'
          ].map((q) => ({ id: q, name: q }))}
        />
      </View>
      <View flex>
        <WrappedTextField
          name={`headers.${index}.value`}
          aria-label={`Header Value ${index}`}
          defaultValue={value}
          supportDataElement
          width="100%"
        />
      </View>
      <View width="size-450">
        {variables.length > 1 && (
          <ActionButton
            aria-label={`Delete Header ${index}`}
            isQuiet
            onPress={() => {
              remove(index);
            }}
          >
            <Delete />
          </ActionButton>
        )}
      </View>
    </Flex>
  );
}
