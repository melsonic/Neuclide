import { useEffect, useState } from "react";
import { Subject, SubjectType } from "./Subject";

export default function Subjects(props: any) {

  const {subjects, onAttendanceUpdate} = props;

  return (
    <div className="grid grid-cols-2 gap-8 lg:w-2/3 mt-8">
      {subjects?.map((s: SubjectType) => <Subject subprops={s} key={s._id} onAttendanceUpdate={onAttendanceUpdate} />)}
    </div>
  );
}
