import React from 'react'
import CustomForm from '../components/CustomForm'
import { useParams } from "react-router-dom";

const EditDetails = () => {
  const { id } = useParams();
  return (
    <div className='container py-3'>
    <CustomForm id={id} />
  </div>
  )
}

export default EditDetails
