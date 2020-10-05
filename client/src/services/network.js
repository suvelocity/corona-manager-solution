import axios from 'axios';
function network(endpoint, method, body = {}) {
  return axios({
    method: method ,
    url: `/api/v1/${endpoint}`,
    data : body 
   })
   .then(res => {
    console.log(res.data);
    return res.data
   } )
   .catch(err => err)
}

//GET REQUEST
const read = (endpoint) => {
return network(endpoint, 'get');
}

//POST REQUEST
const create = (endpoint, body) => {
return network(endpoint, 'post', body)
}

//PUT REQUEST
const update = (endpoint, updated) => {
return network(`/api/v1/${endpoint}`, "put", updated)
}

//POST DELETE
const remove = (endpoint, body) => {
return network(`/api/v1/${endpoint}`, "delete", body)
}

export { read, create, update, remove };

