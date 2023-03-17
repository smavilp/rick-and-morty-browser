import React from 'react';

const Pagination = ({residentsPerPage, totalResidents, paginate}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalResidents / residentsPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <nav className='Pagination'>
      <ul className='Pagination-ul'>
        {pageNumbers.map(number => (
          <li className='Pagination-li' key={number}>
            <a className='Pagination-a' href="#" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;