import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const ResidentInfo = ({url}) => {

  const [residentData, setResidentData] = useState({})

  axios.get(`${url}`)
    .then (resp  => {
      setResidentData(resp.data)
    })
    .catch(error => console.error(error))

  return (
    <article className='ResidentInfo'>
      <img className='ResidentInfo-img' src={residentData?.image} alt="" />
      <div className='ResidentInfo-div--1'>
        <div className='ResidentInfo-div--2'>
          <div className='ResidentInfo-div--3'>
            <table className='ResidentInfo-table'>
              <tbody>
                <tr>
                  <th className='ResidentInfo-th'>species</th>
                  <td className='ResidentInfo-td'>{residentData?.species}</td>
                </tr>
                <tr>
                  <th className='ResidentInfo-th'>origin</th>
                  <td className='ResidentInfo-td'>{residentData.origin?.name}</td>
                </tr>
                <tr>
                  <th className='ResidentInfo-th'>times appear</th>
                  <td className='ResidentInfo-td'>{residentData.episode?.length} time</td>
                </tr>
                <tr>
                  <th className='ResidentInfo-th'>status</th>
                  <td className='ResidentInfo-td'>{residentData?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='ResidentInfo-div--4'>
          <h2 className='ResidentInfo-h2'>{residentData?.name}</h2>
        </div>
      </div>
    </article>
  );
};

export default ResidentInfo;