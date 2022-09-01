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
import { useFormContext } from 'react-hook-form';
import { Flex } from '@adobe/react-spectrum';
import showError from '../utils/showError';

export default function ValidationWrapper({ children, width }) {
  const [firstChild, ...restChildren] = children;
  const { name: fieldName, description } = firstChild.props;
  const {
    formState: { errors }
  } = useFormContext();

  const showErrorResult = showError(errors, fieldName);

  return (
    <Flex direction="row" width={width}>
      {React.cloneElement(firstChild, {
        validationState: showErrorResult ? 'invalid' : '',
        errorMessage: showErrorResult || '',
        description: description || ' ' // This line is a workaround for https://github.com/adobe/react-spectrum/issues/3473
      })}

      {restChildren}
    </Flex>
  );
}
