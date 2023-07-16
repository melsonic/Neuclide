import { ClassNames } from "@emotion/react";
import CustomAttendance from "./CustomAttendance";

interface SubjectType {
  _id: string;
  name: string;
  present: number;
  absent: number;
}

function RowItem(props: any) {
  const { name, data, row } = props;
  return (
    <>
      <span className={`row-start-${row} col-start-1`}>
        {name}
      </span>
      <span className={`row-start-${row} col-start-2 justify-self-end`}>
        {data}
      </span>
    </>
  );
}

function Subject(props: any) {
  let { name, present, absent } = props.subprops;
  const { onAttendanceUpdate } = props;
  if (name.length > 25)
    name = `${name.slice(0, 20)} ...`;
  return (
    <div className="userview-box-bg rounded-lg flex flex-col p-8">
      <h1 className="text-2xl font-bold text-center mb-4">{name.toUpperCase()}</h1>

      <div className="flex flex-row items-center justify-evenly w-full">
        <CustomAttendance subprops={props.subprops} onAttendanceUpdate={onAttendanceUpdate} />

        <div className="grid  text-2xl">
          <h1 className="row-start-1 py-4 text-gray-500 font-bold">Attendance</h1>
          {/* present */}
          <RowItem name="Present" data={present} row="2" />
          {/* absent */}
          <RowItem name="Absent" data={absent} row="3" />
          {/* horizontal bar */}
          <span className="row-start-4 col-span-2 h-1 bg-gray-600 rounded-full my-2">
          </span>
          {/* total */}
          <RowItem name="Total" data={present + absent} row="5" />
        </div>
      </div>
    </div>
  );
}

export { Subject, type SubjectType };
