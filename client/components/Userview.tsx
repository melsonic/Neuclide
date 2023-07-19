import UserStatBox from "./UserStatBox";
import Avatar from "../public/profile.jpg";
import Image from "next/image";
import Subjects from "./Subjects";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import AddSubjectModal from "./AddSubjectModal";
import { SubjectType } from "./Subject";


export default function Userview() {

  let [headerString, setHeaderString] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const subnameref = useRef(null);

  const [subjects, setSubjects] = useState<Array<SubjectType>>();
  const [percentage, setPercentage] = useState<number>(0);

  const getPercentage = useCallback( () => {
    if(subjects === undefined || subjects === null) return 0;

    let decimal = 0;
    let times = 0;
    for(let subject of subjects) {
      let tem = (subject.present * 100)/(subject.present + subject.absent);
      decimal += tem;
      times += 1;
    }
    return decimal/times;
  }, [subjects]);

  const getSubjects = useCallback( async () => {
    let sessionToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:8080/subject/getsubs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
    });

    if(response.ok) {
      const data = await response.json();
      setSubjects(data.subjects);
      setPercentage(getPercentage());
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

    getSubjects();

  }, [getSubjects]);

  return (
    <div className="bg-image flex flex-col flex-start items-center rounded-sm overflow-x-hidden py-16">
      <h1 className="text-3xl sm:text-5xl font-bold">{headerString}</h1>
      {/* top box : global stats*/}
      <div className="flex flex-row justify-evenly items-center userview-box-bg p-4 sm:p-8 mt-16 lg:w-2/3">
        <UserStatBox item="01" name="Target" percentage="75" />
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
