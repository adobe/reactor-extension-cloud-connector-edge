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

import React, { useState } from 'react';
import { Item, View, TabList, TabPanels, Tabs } from '@adobe/react-spectrum';

import ExtensionView from '../components/extensionView';

import RequestsFields from './components/requestSection/fields';
import getRequestFieldsInitValues from './components/requestSection/getInitValues';
import getRequestFieldsSettings from './components/requestSection/getSettings';
import validateRequestFields from './components/requestSection/validate';

import QueryParamsFields from './components/queryParamsSection/fields';
import getQueryParamsInitValues from './components/queryParamsSection/getInitValues';
import getQueryParamsSettings from './components/queryParamsSection/getSettings';
import validateQueryParamsFields from './components/queryParamsSection/validate';

import HeadersFields from './components/headersSection/fields';
import getHeadersInitValues from './components/headersSection/getInitValues';
import getHeadersSettings from './components/headersSection/getSettings';
import validateHeadersFields from './components/headersSection/validate';

import BodyFields from './components/bodySection/fields';
import getBodyInitValues from './components/bodySection/getInitValues';
import getBodySettings from './components/bodySection/getSettings';
import validateBodyFields from './components/bodySection/validate';

import AdvancedFields from './components/advancedSection/fields';
import getAdvancedValues from './components/advancedSection/getInitValues';
import getAdvancedSettings from './components/advancedSection/getSettings';
import validateAdvancedFields from './components/advancedSection/validate';

export default function SendData() {
  const [selectedTab, setSelectedTab] = useState('queryParams');

  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getRequestFieldsInitValues(initInfo),
        ...getQueryParamsInitValues(initInfo),
        ...getHeadersInitValues(initInfo),
        ...getBodyInitValues(initInfo),
        ...getAdvancedValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getRequestFieldsSettings(values),
        ...getQueryParamsSettings(values),
        ...getHeadersSettings(values),
        ...getBodySettings(values),
        ...getAdvancedSettings(values)
      })}
      validate={(values) => ({
        ...validateRequestFields(values),
        ...validateQueryParamsFields(values),
        ...validateHeadersFields(values),
        ...validateBodyFields(values),
        ...validateAdvancedFields(values)
      })}
      render={() => (
        <>
          <RequestsFields />

          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            aria-label="Properties"
          >
            <TabList>
              <Item key="queryParams">Query Params</Item>
              <Item key="headers">Headers</Item>
              <Item key="body">Body</Item>
            </TabList>
            <TabPanels>
              <Item key="queryParams">
                <View
                  paddingStart="size-200"
                  paddingEnd="size-200"
                  paddingBottom="size-200"
                >
                  <QueryParamsFields />
                </View>
              </Item>
              <Item key="headers">
                <View
                  paddingStart="size-200"
                  paddingEnd="size-200"
                  paddingBottom="size-200"
                >
                  <HeadersFields />
                </View>
              </Item>
              <Item key="body">
                <View
                  paddingStart="size-200"
                  paddingEnd="size-200"
                  paddingBottom="size-200"
                >
                  <BodyFields />
                </View>
              </Item>
            </TabPanels>
          </Tabs>

          <AdvancedFields />
        </>
      )}
    />
  );
}
