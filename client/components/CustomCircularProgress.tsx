import { Box, CircularProgress, CircularProgressLabel, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

interface CustomCircularProgressProps {
  percentage: number
}

export default function CustomCircularProgress(props: CustomCircularProgressProps): ReactElement {
  
  let { percentage } = props;
  percentage = Number(percentage);

  if (isNaN(percentage)) {
    percentage = 0;
  }

  percentage = Math.round((percentage + Number.EPSILON) * 10) / 10

  return (
    <div className="pt-8">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h={{ base: '80px', md: '120px',  }}
        w={{ base: '80px', md: '120px',  }}
        >
        <CircularProgress value={percentage} size="100%" color={percentage >= 75 ? 'neuclide_green' : 'neuclide_red'} >
        <CircularProgressLabel fontSize={{base: '20px', md: '30px'}} >{percentage}</CircularProgressLabel>
      </CircularProgress>
      </Box>
    </div>
  );
}
