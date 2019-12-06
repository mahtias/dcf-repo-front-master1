import axios from 'axios';

export default axios.create({

     baseURL: 'http://localhost:4000/api'
  // baseURL: 'http://dcf-suivi-engagement-mandat.kognishare.com/api'
})
