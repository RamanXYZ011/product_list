import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const ProductList = () => {
  return (
    <div className='container'>
       <div>
          ProductList
       </div>
       <div>

       <Table>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <Button href='/product-detail' className='btn btn-dark btn-sm'>Show</Button>
            <Button href='/add-product' className='btn btn-dark btn-sm'>Edit</Button>
            <Button href='/add-product' className='btn btn-dark btn-sm'>Delete</Button>
          </td>  
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>
            <Button href='/product-detail' className='btn btn-dark btn-sm'>Show</Button>
            <Button href='/add-product' className='btn btn-dark btn-sm'>Edit</Button>
            <Button href='/add-product' className='btn btn-dark btn-sm'>Delete</Button>
          </td>
        </tr>
        
      </tbody>
    </Table>

       </div>
    </div>
  )
}

export default ProductList
