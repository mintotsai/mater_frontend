// https://chat.openai.com/c/904ab2a7-cc46-4e12-b11a-f3aeb3ad74e0
import { ClockIcon } from '@heroicons/react/solid';
import { ErrorMessage, useField } from 'formik';
import { Fragment } from 'react';

export default function TimeInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <Fragment>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="w-full mt-2 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          {...field}
          {...props}
          type="time"
          // pattern="[0-9]{2}:[0-9]{2}"
          // minLength={5}
          // maxLength={5}
          className={`${isError
            ? 'ring-2 ring-red-500 border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } block w-full pl-10 sm:text-sm border rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
      <ErrorMessage name={field.name} component="div" className="mt-2 text-sm text-red-600" />
    </Fragment>
  );
};