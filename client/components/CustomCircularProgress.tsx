import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function CustomCircularProgress(props: any) {
  let {percentage} = props;
  percentage = Number(percentage);
  if (isNaN(percentage)) {
    percentage = 0;
  }

  percentage = Math.round((percentage + Number.EPSILON) * 10) / 10

  return (
    <div className="pt-8">
      <CircularProgress value={percentage} size={150} color='green.300' >
        <CircularProgressLabel>{percentage}</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
}
