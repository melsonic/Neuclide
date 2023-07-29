import { ReactElement } from 'react';
import CustomCircularProgress from './CustomCircularProgress';

interface UserStatBoxProps {
  item: string,
  name: string,
  percentage: number
}

export default function UserStatBox(props: UserStatBoxProps): ReactElement {
  return (
    <div className="flex flex-col items-center px-1 sm:px-8">
      <div className="flex items-center justify-center text-base font-bold">
        <span className="h-10 w-10 leading-10 text-center text-gray-700 bg-white cursor-pointer rounded-full" >
          {props.item}
        </span>
        <span className="text-gradient pl-1 sm:pl-4 sm:text-3xl">
          {props.name.toUpperCase()}
        </span>
      </div>
      <CustomCircularProgress percentage={props.percentage} />
    </div>
  )
}
