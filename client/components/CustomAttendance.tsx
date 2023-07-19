import { Button } from '@chakra-ui/react';
import CustomCircularProgress from './CustomCircularProgress';

export default function CustomAttendance(props: any) {
  const { name, present, absent } = props.subprops;
  const { onAttendanceUpdate } = props;
  const percentage = (present * 100) / (present + absent);

  async function handlePresent(e: any) {
    e.preventDefault();
    let sessionToken = localStorage.getItem("token");
    let resp = await fetch("http://localhost:8080/subject/updateattended", {
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

  }

  async function handleAbsent(e: any) {
    e.preventDefault();
    let sessionToken = localStorage.getItem("token");
    let resp = await fetch("http://localhost:8080/subject/updatemissed", {
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

  }

  return (
    <div className='flex flex-col justify-between items-center'>
      <CustomCircularProgress percentage={percentage} />
      <div className='flex justify-evenly w-full text-2xl mt-4'>
        <Button className='mr-1' type='submit' colorScheme='whatsapp' variant='solid' onClick={handlePresent} >+</Button>
        <Button className='ml-1' type='submit' colorScheme='red' variant='solid' onClick={handleAbsent} >-</Button>
      </div>
    </div>
  )
}
