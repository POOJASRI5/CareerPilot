import axios from "axios";

const API_URL = "http://localhost:8051/interviews";

export const getAllInterviews = () => {
    return axios.get(API_URL);
};

export const addInterview = (interview) => {
    return axios.post(API_URL, interview);
};

export const updateInterview = (id, interview) => {
    return axios.put(`${API_URL}/${id}`, interview);
};

export const deleteInterview = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};