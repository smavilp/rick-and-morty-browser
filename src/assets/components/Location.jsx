import React from 'react';

const Location = ({data}) => {
  return (
    <div className='Location'>
      <div className='Location-div--2'>
        <div className='Location-div--3'>
          <table className='Location-table'>
            <tbody>
              <tr>
                <th className='Location-th'>Type</th>
                <th className='Location-th'>Dimension</th>
                <th className='Location-th'>Population</th>
              </tr>
              <tr>
                <td className='Location-td'>{data.type}</td>
                <td className='Location-td'>{data.dimension}</td>
                <td className='Location-td'>{data.residents?.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='Location-div--4'>
        <h2 className='Location-h2'>{data.name}</h2>
      </div>
    </div>
  );
};

export default Location;