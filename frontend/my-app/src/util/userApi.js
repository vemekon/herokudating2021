import axios from "axios";

export const getcurrentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const cloudUpload = async (formData, authtoken) => {
  return await axios.post(
    "https://api.cloudinary.com/v1_1/mekele/image/upload",
    formData
  );
};

export const updateProfile = async (data, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/updateuser`, data, {
    headers: {
      authtoken,
    },
  });
};
export const registerUser = async (data, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/registeruser`, data, {
    headers: {
      authtoken,
    },
  });
};
export const searchUser = async (data, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/searchusers`, data, {
    headers: {
      authtoken,
    },
  });
};
export const profileInit = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/getprofile`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const sendMessages = async (data, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/messages`, data, {
    headers: {
      authtoken,
    },
  });
};
export const newMessages = async (data, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/newmessage`, data, {
    headers: {
      authtoken,
    },
  });
};
export const getMessages = async (authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/getmessages`, {
    headers: {
      authtoken,
    },
  });
};
export const friendAdd = async (id, authtoken) => {
  console.log(id);
  return await axios.post(
    `${process.env.REACT_APP_API}/addfriend`,
    { id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const friendList = async (authtoken) => {
  console.log(authtoken);
  return await axios.get(`${process.env.REACT_APP_API}/listfriend`, {
    headers: {
      authtoken,
    },
  });
};
