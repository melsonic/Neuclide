// theme.ts (Version 2 needs to be a tsx file, due to usage of StyleFunctions)
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
export const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.400',
        color: 'white',
      },
    },
  },
  colors: {
    neuclide_green: "#3CDF86",
    neuclide_red: "#FD4343"
  }
})
