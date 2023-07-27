import { useState, useEffect } from 'react'
import './App.css'
// import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [nationalitiesWithAllOption, setNationalitiesWithAllOption] = useState([])
  
  const [filter, setFilter] = useState({
    minAge: 0,
    maxAge: 100,
    nationality: 'all',
    gender: 'all',
    search: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredUsers = data.filter((user) => {
    const age = user.dob.age;
    const nationality = filter.nationality === 'all' ? true : user.nat === filter.nationality;
    const gender = filter.gender === 'all' ? true : user.gender === filter.gender;
    const name = user.name.first.toLowerCase().includes(filter.search.toLowerCase()) || 
                 user.name.last.toLowerCase().includes(filter.search.toLowerCase());
    
    return age >= filter.minAge && age <= filter.maxAge && nationality && gender && name;
  });

  const getPostsData = async () => {
    try {
      const request = await fetch('https://randomuser.me/api/?results=20');
      const response = await request.json();
      const { results } = await response;

      // Extract unique nationalities from the results array
      const uniqueNationalities = [...new Set(results.map((user) => user.nat))];

      // Add 'all' as an option for all nationalities
      setNationalitiesWithAllOption(['all', ...uniqueNationalities]);

      // Update the data state with nationalities
      setData(results);
      setFilter((prevFilter) => ({
        ...prevFilter,
        nationality: 'all', // Set the default value to 'all'
      }));
    } catch (error) {
      console.log(error);
    }

  }
  
  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div>

      <div className="grid grid-cols-5 gap-3 p-4 mb-5 border-b border-gray-300">
        
        <div className="flex flex-col gap-1">          
          <label className="text-xs" htmlFor="minAge">Min Age:</label>
          <input type="number" name="minAge" className='border py-1 text-sm px-3 rounded-md border-gray-400' value={filter.minAge} onChange={handleFilterChange} />
        </div>

        <div className="flex flex-col gap-1">          
          <label className="text-xs" htmlFor="maxAge">Max Age:</label>
          <input type="number" name="maxAge" className='border py-1 text-sm px-3 rounded-md border-gray-400' value={filter.maxAge} onChange={handleFilterChange} />
        </div>
        
        <div className="flex flex-col gap-1">          
          <label className="text-xs" htmlFor="nationality">Nationality:</label>
          <select
            name="nationality"
            value={filter.nationality}
            className="border py-1 text-sm px-3 rounded-md border-gray-400"
            onChange={handleFilterChange}
          >
            {nationalitiesWithAllOption.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">          
          <label className="text-xs" htmlFor="gender">Gender:</label>
          <select name="gender" value={filter.gender} className='border py-1 text-sm px-3 rounded-md border-gray-400' onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="flex flex-col gap-1">          
          <label className="text-xs" htmlFor="search">Search:</label>
          <input type="text" name="search" className='border py-1 text-sm px-3 rounded-md border-gray-400' value={filter.search} onChange={handleFilterChange} />
        </div>

      </div>

      <div className="mx-auto w-4/6">
        <div style={{overflowX: 'auto'}} >
          <table>
            <tr>
              <th>Image</th>
              <th>Fullname</th>
              <th>Age</th>
              <th>Nationality</th>
              <th>Gender</th>
            </tr>

            {filteredUsers.map((user) => (

              <tr className='text-xs' key={user.login.uuid}>
                <td>
                  <img src={user.picture.thumbnail} className="rounded-md" alt={user.name.first} />
                </td>
                <td>
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </td>
                <td>
                  {`${user.dob.age}`}
                </td>
                <td>
                  {`${user.nat}`}
                </td>
                <td>
                  {`${user.gender}`}
                </td>
              </tr>

            ))}
          </table>

        </div>
      </div>
    
    </div>
  )
}

export default App
