import { useState } from "react";
import Header from "../components/Header";

const PostNewJob = () => {
    const [postMessage, setPostMessage] = useState('');
    const [newJobPostData, setNewJobPostData] = useState({
        title: '',
        companyName: '',
        location: '',
        salary: 0,
        jobType: '',
        jobDescription: '',
        jobQualification: []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewJobPostData({
            ...newJobPostData, [name]: name === "jobQualification"?value.split(', '): value
        });
    }
    const handleForm = async (e) => {
        e.preventDefault();
        /*if(newJobPostData.title && newJobPostData.companyName && newJobPostData.location && newJobPostData.salary && newJobPostData.jobType && newJobPostData.jobDescription && newJobPostData.jobQualification.length>0){
            console.log(newJobPostData);
        }*/
       try{
        const response = await fetch('https://job-posting-project-backend.vercel.app/jobpost/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(newJobPostData)
        });
        if(!response.ok){
            throw 'failed to add new jobpost';
        }
        const data = await response.json();
        if(data){
            setPostMessage(data.message);
        }
       }
       catch (error) {
        throw error;
       }
    };

    return(
        <div>
            <Header/>
            <div className="container">
                <h2 className="py-2">Post a Job</h2>
                <p>{postMessage}</p>
                <form onSubmit={handleForm}>
                    <label htmlFor="jobTitle" className="form-label fw-semibold">Job Title:</label>
                    <input type="text" id="jobTitle" name="title" className="form-control" value={newJobPostData.title} onChange={handleChange} required/><br/>

                    <label htmlFor="companyName" className="form-label fw-semibold">Company Name:</label>
                    <input type="text" id="companyName" name="companyName" className="form-control" value={newJobPostData.companyName} onChange={handleChange} required/><br/>

                    <label htmlFor="location" className="form-label fw-semibold">Location:</label>
                    <input type="text" id="location" name="location" className="form-control" value={newJobPostData.location} onChange={handleChange} required/><br/>

                    <label htmlFor="salary" className="form-label fw-semibold">Salary:</label>
                    <input type="number" id="salary" name="salary" className="form-control" value={newJobPostData.salary} onChange={handleChange} required/><br/>

                    <label htmlFor="jobType" className="form-label fw-semibold">Job Type:</label>
                    <select id="jobType" className="form-select" name="jobType" required onChange={handleChange}>
                        <option value={''} disabled selected>Select</option>
                        <option value={'Full-time (On-site)'}>Full-time (On-site)</option>
                        <option value={'Full-time (Remote)'}>Full-time (Remote)</option>
                        <option value={'Part-time (On-site)'}>Part-time (On-site)</option>
                        <option value={'Part-time (Remote)'}>Part-time (Remote)</option>
                    </select><br/>

                    <label htmlFor="jobDescription" className="form-label fw-semibold">Job Description:</label>
                    <textarea id="jobDescription" name="jobDescription" className="form-control" value={newJobPostData.jobDescription} onChange={handleChange} required></textarea><br/>

                    <label htmlFor="jobQualification" className="form-label fw-semibold">Job Qualification:</label>
                    <textarea id="jobQualification" name="jobQualification" className="form-control" value={newJobPostData.jobQualification.join(', ')} onChange={handleChange}  required></textarea><br/>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>
        </div>
    )
}
export default PostNewJob;