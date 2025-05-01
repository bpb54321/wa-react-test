import React from 'react'
import PropTypes from 'prop-types'

function Pagination({
  currentPage,
  totalCount,
  initialPage,
  limit,
  onNext,
  onPrevious,
}) {
  return (
    <div>
      {currentPage > initialPage ? (
        <button type="button" onClick={onPrevious}>
          Previous Page
        </button>
      ) : null}
      {currentPage * limit < totalCount ? (
        <button type="button" onClick={onNext}>
          Next Page
        </button>
      ) : null}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  initialPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
}

export default Pagination
