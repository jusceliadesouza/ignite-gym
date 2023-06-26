import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null 
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput 
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

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}