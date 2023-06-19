import { Input as NativeInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeInput 
      h={14}
      mb={4}
      px={4}
      bg="gray.700"
      color="white"
      fontSize="md"
      fontFamily="body"
      borderWidth={0}
      placeholderTextColor='gray.300'
      {...rest}
    />
  )
}