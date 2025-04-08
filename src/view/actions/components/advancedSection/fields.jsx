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

import React, { useEffect, useState } from 'react';
import {
  Heading,
  Checkbox,
  TooltipTrigger,
  ActionButton,
  Tooltip,
  Flex,
  View,
  TableView,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  Link
} from '@adobe/react-spectrum';
import Info from '@spectrum-icons/workflow/Info';
import { Controller, useFormContext } from 'react-hook-form';
import WrappedTextField from '../../../components/wrappedTextField';
import loadCertificates from './api/loadCertificates';
import {
  CERTIFICATE_TYPE,
  COLUMN_CERTIFICATE_STATUS,
  COLUMN_ENVIRONMENT,
  ENVIRONMENT_DEVELOPMENT,
  ENVIRONMENT_STAGING,
  ENVIRONMENT_PRODUCTION
} from '../../../utils/constants';
import generateEnvironmentUrl from '../../../utils/generateEnvironmentUrl';

let environmentOrder = [
  ENVIRONMENT_DEVELOPMENT,
  ENVIRONMENT_STAGING,
  ENVIRONMENT_PRODUCTION
];

let certificateTableColumns = [
  { name: 'Environment', uid: COLUMN_ENVIRONMENT },
  { name: 'Certificate Status', uid: COLUMN_CERTIFICATE_STATUS }
];

export default function AdvancedSectionFields() {
  const [showResponseField, setShowResponseField] = useState(false);
  const [certificateTableData, setCertificateTableData] = useState(null);

  const { watch, control } = useFormContext();
  const { saveResponse, responseKey, useMtls, organizationData } = watch();

  useEffect(() => {
    setShowResponseField(saveResponse);
  }, [saveResponse]);

  useEffect(() => {
    let id = 0;

    loadCertificates()
      .then((result) => {
        const availableCertificates = (result?.included || []).reduce(
          (acc, curr) => {
            if (curr.type === CERTIFICATE_TYPE) {
              acc[curr.id] = curr.attributes;
            }

            return acc;
          },
          {}
        );

        const certificatesStatusByEnvironment = result.data
          .sort((a, b) => {
            const aIndex = environmentOrder.indexOf(a.attributes.stage);
            const bIndex = environmentOrder.indexOf(b.attributes.stage);
            return aIndex - bIndex;
          })
          .map((item) => ({
            id: id++,
            environmentId: item.id,
            [COLUMN_ENVIRONMENT]: item.attributes.name,
            [COLUMN_CERTIFICATE_STATUS]:
              availableCertificates[
                item?.relationships?.adobe_certificate?.data?.id
              ]?.status || 'n / a'
          }));

        setCertificateTableData(certificatesStatusByEnvironment);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <View marginTop="size-200">
      <Heading level="3">Advanced</Heading>

      <Controller
        control={control}
        name="saveResponse"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Checkbox
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e);
              setShowResponseField(e);
            }}
            isSelected={value}
            inputRef={ref}
          >
            Save the request response
          </Checkbox>
        )}
      />

      {showResponseField && (
        <Flex alignItems="center" gap="size-10">
          <WrappedTextField name="responseKey" label="Response key" />
          <TooltipTrigger delay={0}>
            <ActionButton aria-label="Info" isQuiet marginTop="size-100">
              <Info size="S" />
            </ActionButton>
            <Tooltip>
              {`The request result will be added to the "ruleStash"
          that is sent to the next actions from the rule. It will be accessible at
          the following path: "arc.ruleStash.adobe-cloud-connector.responses.${
            responseKey || '{keyName}'
          }"`}
            </Tooltip>
          </TooltipTrigger>
        </Flex>
      )}

      <br />

      <Controller
        control={control}
        name="useMtls"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Checkbox
            onBlur={onBlur}
            onChange={onChange}
            isSelected={value}
            inputRef={ref}
          >
            Enable mTLS
          </Checkbox>
        )}
      />

      {useMtls && certificateTableData && (
        <TableView
          aria-label="Example table with dynamic content"
          maxWidth="size-6000"
        >
          <TableHeader columns={certificateTableColumns}>
            {(column) => <Column key={column.uid}>{column.name}</Column>}
          </TableHeader>
          <TableBody items={certificateTableData}>
            {(item) => (
              <Row>
                {(columnKey) => {
                  if (columnKey === COLUMN_ENVIRONMENT) {
                    return (
                      <Cell>
                        <Link
                          href={generateEnvironmentUrl(item, organizationData)}
                          target="_blank"
                        >
                          {item[columnKey]}
                        </Link>
                      </Cell>
                    );
                  }
                  return <Cell>{item[columnKey]}</Cell>;
                }}
              </Row>
            )}
          </TableBody>
        </TableView>
      )}
    </View>
  );
}
