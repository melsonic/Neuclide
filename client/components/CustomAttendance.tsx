import { Button } from '@chakra-ui/react';
import CustomCircularProgress from './CustomCircularProgress';
import { ReactElement, MouseEvent } from 'react';
import { SubjectType } from './Subject';

interface CustomAttendanceProps {
  subprops: SubjectType,
  onAttendanceUpdate: Function
}

export default function CustomAttendance(props: CustomAttendanceProps): ReactElement {
  const { name, present, absent } = props.subprops;
  const { onAttendanceUpdate } = props;
  const percentage = (present * 100) / (present + absent);

  async function handlePresent(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let sessionToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:8080/subject/updateattended", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        subname: name
      })
    });

    if(response.ok)
      onAttendanceUpdate();

  }

  async function handleAbsent(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let sessionToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:8080/subject/updatemissed", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        subname: name
      })
    });

    if(response.ok)
      onAttendanceUpdate();

  }

  return (
    <div className='flex flex-col justify-between items-center'>
      <CustomCircularProgress percentage={percentage} />
      <div className='flex justify-evenly w-full text-2xl mt-4'>
        <Button className='mr-1' type='submit' background='neuclide_green' color='black' variant='solid' onClick={handlePresent} >+</Button>
        <Button className='ml-1' type='submit' background='neuclide_red' color='black' variant='solid' onClick={handleAbsent} >-</Button>
      </div>
    </div>
  )
}
