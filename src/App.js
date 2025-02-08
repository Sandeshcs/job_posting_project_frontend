import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import useFetch from "./useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [searchInput, setSearchInput]= useState('');
  const [searchData, setSearchInputData] = useState([]);
  const [showApiData, setApiData] = useState(true);
  const [showSearchData, setSearchData] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('')

  const {data, loading, error} = useFetch('https://job-posting-project-backend.vercel.app/jobposts/all');
  //console.log(data);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    const foundData = data? data.data.filter(jobpost => jobpost.title.includes(e.target.value)):[];
    //console.log(foundData);
    if(foundData.length>0){
      setSearchInputData(foundData);
      setApiData(false);
      setSearchData(true);
    }else{
      setApiData(true);
      setSearchData(false);
    }
  }
  
  const handleDeleteBtn = async (jobpostToDelete) => {
    const response = await fetch(`https://job-posting-project-backend.vercel.app/jobpost/delete/${jobpostToDelete}`, {
      method: "DELETE",
    });
    //console.log(response);
    if(!response.ok){
      throw "failed to delete requested jobpost."
    }
    const data = await response.json();
    if(data){
      setDeleteMessage(data.message);
      window.location.reload();
    }
  } 
  return (
    <div>
      <Header/>
      <div className="container">
        <input type="text" id="searchInput" onChange={handleSearchInput} value={searchInput} placeholder="Search by job title..." className="w-50 p-2 mt-2 form-control"/>
        {loading && 
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
        <p>{deleteMessage}</p>
        <div className="row mt-3">
        {showApiData && (data? data.data && data.data.length>0 && (
          data.data.map((jobpost, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-3 pb-2">
                <div className="card-body">
                  <h3>{jobpost.title}</h3>
                  <p><strong>Company name: </strong>{jobpost.companyName}</p>
                  <p><strong>Location: </strong>{jobpost.location}</p>
                  <p><strong>Job type: </strong>{jobpost.jobType}</p>
                  <Link className="btn btn-primary ps-5 pe-5" to={`/jobPostDetails/${jobpost._id}`}>See Details</Link> <button className="btn btn-danger ps-5 pe-5" onClick={() => handleDeleteBtn(jobpost._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ): error && <p>{error}</p>)}
        {showSearchData && (searchData.length>0 && (
          searchData.map((jobpost, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-3 pb-2">
                <div className="card-body">
                  <h3>{jobpost.title}</h3>
                  <p><strong>Company name: </strong>{jobpost.companyName}</p>
                  <p><strong>Location: </strong>{jobpost.location}</p>
                  <p><strong>Job type: </strong>{jobpost.jobType}</p>
                  <Link className="btn btn-primary ps-5 pe-5" to={`/jobPostDetails/${jobpost._id}`}>See Details</Link> <button className="btn btn-danger ps-5 pe-5" onClick={() => handleDeleteBtn(jobpost._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
