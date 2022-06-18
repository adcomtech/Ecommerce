const SearchForm = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = e => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <input
      type='search'
      placeholder='Filter'
      value={searchQuery}
      onChange={handleSearchChange}
      className='form-control mb-4'
    />
  );
};

export default SearchForm;
