import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocation } from 'react-router-dom';


const FinanceStudentDetail = () => {

  const location = useLocation()
  const student_id = location.pathname.charAt(location.pathname.length-1)
  console.log("student_id: ", student_id)
  const token = JSON.parse(localStorage.getItem("token"));


const fetchStudentPayement = (student_id) => {
  return (
    axios.get(`http://127.0.0.1:8000/api/v1/finance/student_payement/?student=${student_id}`).then(response => response.data)
  )
}
const fetchStudentInfos = (student_id) => {
  return (
    axios.get(`http://127.0.0.1:8000/api/v1/students/${student_id}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    }).then(response => response.data)
  )
}

const {data: studentPayements = []} = useQuery(["student_payements", student_id],() => fetchStudentPayement(student_id))
const {data: studentInfos = []} = useQuery(["student_infos", student_id],() => fetchStudentInfos(student_id))

console.log("studentInfos: ",studentInfos)

  return (
    <div className='ml-44 mr-10'>
      <div>
        <p>Student Informations</p>
        <div className='h-[100px] w-[100px]'>
          <img src={"http://127.0.0.1:8000"+studentInfos.image_url}/>
          {/* <p>url: {studentInfos.image_url}</p> */}
        </div>
      </div>
      <p>Payements</p>
      <div className="grid grid-cols-6 w-full">
        <p>Date</p>
        <p>Amount</p>
        <p className='col-span-3'>Comment</p>
        <p>Action</p>
      </div>
      <ul>
      {
        studentPayements.map(item => {
          return (
          <li key={item.id}>
            <div className='grid grid-cols-6'>
            <p>{item.date_of_payement}</p>
            <p>{item.amount}</p>
            <p className='col-span-3'>{item.comment}</p>
            <p>Action</p>
            </div>
          </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default FinanceStudentDetail