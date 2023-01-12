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
  View
} from '@adobe/react-spectrum';
import Info from '@spectrum-icons/workflow/Info';
import { Controller, useFormContext } from 'react-hook-form';
import WrappedTextField from '../../../components/wrappedTextField';

export default function AdvancedSectionFields() {
  const { watch, control } = useFormContext();
  const { saveResponse, responseKey } = watch();
  const [showResponseField, setShowResponseField] = useState();

  useEffect(() => {
    setShowResponseField(saveResponse);
  }, [saveResponse]);

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
    </View>
  );
}
