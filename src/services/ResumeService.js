import axios from "axios";

const API_URL = "http://localhost:8051/resumes";

export const getAllResumes = () => {
    return axios.get(API_URL);
};

export const addResume = (formData) => {
    return axios.post(
        "http://localhost:8051/resumes",
        formData
    );
};
export const getResumeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};



export const deleteResume = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
export const updateResume = (id, formData) => {
    return axios.put(
        `http://localhost:8051/resumes/${id}`,
        formData
    );
};