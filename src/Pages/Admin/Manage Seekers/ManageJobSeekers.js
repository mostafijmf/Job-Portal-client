import axios from 'axios';
import React, { useState } from 'react';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import AJobSeeker from './AJobSeeker';

const ManageJobSeekers = () => {
    const [allUsers] = useGetAllUsers();
    const [deleteUData, setDeleteUData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();

    const seeker = allUsers.filter(s=>s.seeker);

    const handleDelete = async email => {
        setLoading(true);
        const url = `https://boiling-beach-14928.herokuapp.com/users/${email}`;
        await axios.delete(url)
            .then(res => {
                setDeleteUData(!deleteUData);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
            });
    };

    return (<>
        <PageTitle title='Manage Seeker - Dashboard'></PageTitle>
        <h1 className='text-2xl text-center my-5 text-accent font-medium'>Manage job seekers</h1>
        <div className="overflow-x-auto">
            <table className="table w-full" id='exportToxlsx'>
                <thead>
                    <tr>
                        <th className='bg-slate-100 py-3 rounded-l-none normal-case text-base font-medium'>No.</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Name</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Email</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Phone number</th>
                        <th className='bg-slate-100 py-3 rounded-r-none normal-case text-base font-medium'></th>
                    </tr>
                </thead>
                {seeker.map((user, index) =>
                    <AJobSeeker
                        key={user._id}
                        user={user}
                        index={index}
                        setDeleteUData={setDeleteUData}
                        setUserData={setUserData}>
                    </AJobSeeker>
                )}
            </table>

            {
                deleteUData &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">
                            <button onClick={() => setDeleteUData(!deleteUData)} className="btn btn-primary text-white min-h-0 h-10 px-10 tracking-wider">No</button>

                            <button onClick={() => handleDelete(userData.email)}
                                disabled={loading}
                                className="btn btn-outline text-white min-h-0 h-10 px-10 tracking-wider">
                                {loading ? <Spinner></Spinner> : 'Yes'}
                            </button>

                        </div>
                    </div>
                </div>
            }
        </div>
    </>
    );
};

export default ManageJobSeekers;