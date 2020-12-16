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

import { Text, Flex } from '@adobe/react-spectrum';

const showError = (obj, path) => {
  if (obj[path]) {
    return obj[path];
  }

  if (!path) {
    return '';
  }

  const parts = path
    .split('.')
    .map((k) => k.split('[').map((sk) => sk.replace(']', '')))
    .flat();

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (obj[part]) {
      obj = obj[part];
    } else {
      return obj[part];
    }
  }

  return obj;
};

export default ({ children, width }) => {
  const [firstChild, ...restChildren] = children;
  const fieldName = firstChild.props.name;
  const { errors } = useFormContext();

  const showErrorResult = showError(errors, fieldName);

  return (
    <Flex direction="row" width={width}>
      <Flex direction="column" width={width}>
        {React.cloneElement(children[0], {
          validationState: showErrorResult ? 'invalid' : ''
        })}

        <div className="error">
          {showErrorResult ? (
            <Text>{showErrorResult}</Text>
          ) : (
            <Text>&nbsp;</Text>
          )}
        </div>
      </Flex>
      {restChildren}
    </Flex>
  );
};
