import UserStatBox from "./UserStatBox";
import Avatar from "../public/profile.jpg";
import Image from "next/image";
import Subjects from "./Subjects";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import AddSubjectModal from "./AddSubjectModal";
import { SubjectType } from "./Subject";
import Navbar from "./Navbar";
import { useRouter } from "next/router";


export default function Userview(): ReactElement {

  const [headerString, setHeaderString] = useState("");
  const [subjects, setSubjects] = useState<Array<SubjectType>>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const router = useRouter();

  /**
   * Calculate the overall percentage attendance based on the data of an array of subjects.
   * @function getPercentage
   * @param {Array<SubjectType>} subjects - An array of subjects with attendance data.
   * @returns {number} The overall percentage attendance calculated from the given subjects, or 0 if the subjects array is undefined or empty.
   */
  const getPercentage = useCallback((subjects: Array<SubjectType>) => {
    if (subjects.length === 0) return 0;
    let decimal = 0;
    let times = 0;
    for (let subject of subjects) {
      let totalclasses = subject.present + subject.absent;
      if (totalclasses === 0) continue; // skip if no classes for a subject
      let tem = (subject.present * 100) / (subject.present + subject.absent);
      decimal += tem;
      times += 1;
    }
    return decimal / times;
  }, []);


  /**
    * Asynchronously fetch and retrieve the subjects data from the server and update the state with the received data.
    * @async
    * @function getSubjects
    * @returns {Promise<void>} A promise that resolves after fetching and updating the subjects data or an error message.
   */
  const getSubjects = useCallback(async () => {
    let sessionToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:8080/subject/getsubs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      // it removes the initial case, when the registers it has 0 subs
      if(data.subjects.length === 0)
        return;
      setSubjects(data.subjects);
      setPercentage(getPercentage(data.subjects));
    }

  }, [getPercentage]);



  useEffect(() => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = new Date();
    let day = today.getDate();
    const tempStr = month[today.getMonth()].toUpperCase() + " " + today.getDate() + ", " + today.getFullYear();
    setHeaderString(tempStr);

    // else runs infinitely
    if (subjects.length === 0) getSubjects();

    /** 
     * @description Check if user is authorized or not else redirect to 404 page
      * @async
      * @function isAuthorized
      * @returns {Promise<void>} A promise that resolves after checking the user's authorization status or an error message.
     */
    async function isAuthorized(): Promise<void> {
      const sessionToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/user/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (!response.ok)
        router.push('/404');
    }

    isAuthorized();

  }, [getSubjects, router, subjects]);


  return (
    <div className="bg-image flex flex-col flex-start items-center rounded-sm overflow-x-hidden">

      {/* Navbar */}
      <Navbar />


      <h1 className="text-3xl sm:text-5xl font-bold mt-8">{headerString}</h1>

      {/* top box : global stats*/}
      <div className="flex flex-row justify-evenly items-center userview-box-bg p-4 sm:p-8 mt-16 lg:w-2/3">
        <UserStatBox item="01" name="Target" percentage={75} />
        <UserStatBox item="02" name="Overall" percentage={percentage} />
        <div className="flex flex-col h-full items-center justify-between">
          <div className="h-20 w-20 md:h-36 md:w-36 relative" >
            <Image
              src={Avatar}
              alt="profile picture"
              fill
              className="object-cover rounded-full border-4 border-solid border-cyan-400 mb-1"
            />
          </div>

          <AddSubjectModal onSubjectAdded={getSubjects} />

        </div>
      </div>
      <Subjects subjects={subjects} onAttendanceUpdate={getSubjects} />
    </div>
  );
}
