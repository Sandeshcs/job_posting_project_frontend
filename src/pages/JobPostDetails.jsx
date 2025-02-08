import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";

const JobPostDetails = () => {
    const {jobPostId} = useParams();
    const {data, loading, error} = useFetch(`https://job-posting-project-backend.vercel.app/jobpost/id/${jobPostId}`);
    return(
        <div>
            <Header/>
            <div className="container">
                {loading && 
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                }
                {data? data.data && (
                    <>
                    <h2 className="py-3">{data.data.title}</h2>
                    <div className="card pb-2">
                        <div className="card-body">
                        <p><strong>Company name: </strong>{data.data.companyName}</p>
                        <p><strong>Location: </strong>{data.data.location}</p>
                        <p><strong>Salary: </strong>{data.data.salary}</p>
                        <p><strong>Job type: </strong>{data.data.jobType}</p>
                        <p><strong>Job Description: </strong>{data.data.jobDescription}</p>
                        <strong>Job Qualification: </strong>
                            <ol>
                            {data.data.jobQualification.map((jobdata, index) => (
                                <li key={index}>{jobdata}</li>
                            ))}</ol>
                        </div>
                    </div>
                    </>
                ): error && <p>{error}</p>}
            </div>
        </div>
    )
}
export default JobPostDetails;