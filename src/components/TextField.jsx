import React from "react";
import { useField, ErrorMessage } from "formik";
import { BiErrorCircle } from "react-icons/bi";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {props.type !== "textarea" ? (
        <div className='form__input-div'>
          <input
            className={`form__control  ${
              meta.touched && meta.error && "invalid"
            }`}
            autoComplete='off'
            {...field}
            {...props}
          />
          {meta.touched && meta.error && (
            <BiErrorCircle className='errSymbol' />
          )}
          <ErrorMessage
            component='div'
            name={field.name}
            className='errMessage'
          />
        </div>
      ) : (
        <div className='form__input-div'>
          <textarea
            className={`form__control textarea ${
              meta.touched && meta.error && "invalid"
            }`}
            autoComplete='off'
            {...field}
            {...props}
          />
          {meta.touched && meta.error && (
            <BiErrorCircle className='errSymbol' />
          )}
          <ErrorMessage
            component='div'
            name={field.name}
            className='errMessage'
          />
        </div>
      )}
    </>
  );
};

export default TextField;
