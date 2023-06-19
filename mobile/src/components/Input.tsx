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
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500"
      }}
      {...rest}
    />
  )
}