import { Box, CircularProgress, CircularProgressLabel, Flex } from "@chakra-ui/react";

export default function CustomCircularProgress(props: any) {
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
        <CircularProgress value={percentage} size="100%" color={percentage >= 75 ? 'green.300' : 'red.300'} >
        <CircularProgressLabel fontSize={{base: '20px', md: '30px'}} >{percentage}</CircularProgressLabel>
      </CircularProgress>
      </Box>
    </div>
  );
}
