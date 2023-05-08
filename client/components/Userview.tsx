import UserStatBox from "./UserStatBox";
import Avatar from "../public/profile.jpg";
import Image from "next/image";
import Subjects from "./Subjects";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import AddSubjectModal from "./AddSubjectModal";


export default function Userview() {

  let [headerString, setHeaderString] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const subnameref = useRef(null);

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

  }, []);

  return (
    <div className="bg-image flex flex-col flex-start items-center rounded-sm py-16">
      <h1 className="text-5xl font-bold">{headerString}</h1>
      {/* top box : global stats*/}
      <div className="flex flex-row justify-evenly items-center userview-box-bg p-8 mt-16 lg:w-2/3">
        <UserStatBox item="01" name="Target" percentage="75" />
        <UserStatBox item="02" name="Overall" percentage="73" />
        <div className="flex flex-col h-full items-center justify-between py-4">
          <Image
            src={Avatar}
            alt="profile picture"
            height={150}
            width={150}
            className="w-36 h-36 object-cover rounded-full border-4 border-solid border-cyan-400 mb-1"
          />

          <AddSubjectModal />
          
        </div>
      </div>
      <Subjects />
    </div>
  );
}
