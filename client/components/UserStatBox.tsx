import CustomCircularProgress from './CustomCircularProgress';

export default function UserStatBox(props: any) {
  return (
    <div className="flex flex-col items-center px-1 sm:px-8">
      <div className="flex items-center justify-center text-xl font-bold lg:text-3xl">
        <span className="p-2 bg-gray-700 rounded-full" >
          {props.item}
        </span>
        <span className="text-gradient pl-1 sm:pl-4">
          {props.name.toUpperCase()}
        </span>
      </div>
      <CustomCircularProgress percentage={props.percentage} />
    </div>
  )
}
