import { useRef } from "react";
import CustomAttendance from "./CustomAttendance";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  let subject_name = name;
  if (name.length > 25)
    subject_name = `${name.slice(0, 20)} ...`;

  async function handleDelete(e: any) {
    e.preventDefault();
    let sessionToken = localStorage.getItem("token");
    let resp = await fetch("http://localhost:8080/subject/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        subname: name
      })
    });

    onAttendanceUpdate();

    onClose();
  }

  return (
    <div className="userview-box-bg rounded-lg flex flex-col p-8">

      {/* Delete subject */}
      <button className="h-6 w-6 rounded-full text-gray-400 leading-6 text-center font-bold hover:text-red-500" onClick={onOpen} >✖</button>

      {/* Delete subject modal */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent textColor={'whiteAlpha.800'} bg={'#174a62'} >
          <ModalHeader>Confirm Deleting {name}</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme='twitter' color='black' mr={3} onClick={handleDelete} >
              Delete
            </Button>
            <Button colorScheme='gray' color='black' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <h1 className="text-2xl font-bold text-center mb-4">
        {name === subject_name ? (<>{subject_name.toUpperCase()}</>) : (<abbr title={name}>{subject_name.toUpperCase()}</abbr>)}
      </h1>

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
