// import request from './config';

// const clients = {
//     get_clients: (params) => request.get('/client/all', { params }),
//     delete_clients: (client_id, owner_id) => request.delete(`/client`, {
//         params: {
//             client_id,
//             owner_id
//         }
//     })
// };

// export default clients;

import request from './config';

const clients = {
  get_clients: (params) => request.get('/client/all', { params }),
  delete_clients: (client_id, owner_id) => request.delete(`/client`, { params: { client_id, owner_id } }),
};

export default clients;

