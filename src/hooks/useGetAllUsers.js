import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        axios.get('https://api.enlistco.co.in/users')
        .then(res => {
            setAllUsers(res.data)
        })
        .catch(err => {});
    },[allUsers]);
    return [allUsers, setAllUsers];
};

export default useGetAllUsers;