import { useEffect, useState } from "react";
import { Subject, SubjectType } from "./Subject";

export default function Subjects() {
  const [subjects, setSubjects] = useState<Array<SubjectType>>();

  useEffect(() => {
    let sessionToken = localStorage.getItem("token");

    async function getSubjects() {
      let subs = await fetch("http://localhost:8080/subject/getsubs", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
      })
      .then(response => response.json())
      .then(data => setSubjects(data.subjects));
    }

    getSubjects();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 lg:w-2/3 mt-8">
      {subjects?.map((s: SubjectType) => <Subject subprops={s} key={s._id} />)}
    </div>
  );
}
