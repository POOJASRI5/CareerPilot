import axios from "axios";

const BASE_URL = "http://localhost:8051/jobs";

export const getAllJobs = () => axios.get(BASE_URL);

export const addJob = (job) => axios.post(BASE_URL, job);

export const updateJob = (id, job) => axios.put(`${BASE_URL}/${id}`, job);

export const deleteJob = (id) => axios.delete(`${BASE_URL}/${id}`);

export const searchByCompany = (company) =>
    axios.get(`${BASE_URL}/search?company=${company}`);

export const filterByStatus = (status) =>
    axios.get(`${BASE_URL}/filter?status=${status}`);

export const getJobById = (id) =>
    axios.get(`${BASE_URL}/${id}`);

export const sortByDate = () =>
    axios.get(`${BASE_URL}/sort`);