import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ComponentType<IconBaseProps>;
}
const Input: React.FC<InputProps> = function ({ name, icon: Icon, ...rest }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocuset] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocuset(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const hanbleInputFocos = useCallback(() => {
    setIsFocuset(true);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={hanbleInputFocos}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
