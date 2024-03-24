import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Modal from '../../components/Modal';
import { AiFillFile } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";


const Home = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleted, setDeleted] = useState('');

    const openModal = (data) => {
        setDeleted(data)
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const handleConfirm = () => {
        console.log(deleted);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.60.44:5000/account', {
                    params: {
                        search: search
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [search]);

    return (
        <div>
            <div className='bg-gray-800 h-screen'>
                <Navbar />
                {
                    modalOpen === true ? (
                        <Modal
                            isOpen={modalOpen}
                            onConfirm={handleConfirm}
                            closeModal={closeModal}>
                            <div>
                                <h1><strong>Anda Yakin Akan Menghapus File ini?</strong></h1>
                                <div className='flex mt-4 '>
                                    <AiFillFile size={50} color='#00308F' />
                                    <div className='text-gray-700 ml-2'><strong>{deleted.name}</strong></div>
                                </div>

                            </div>
                        </Modal>
                    ) : ""
                }

                <div className='bg-black rounded-lg mx-3 h-4/5 mt-5'>
                    <div className='p-5'>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none"
                        />
                    </div>
                    <h1 className='text-gray-200 ml-5'><strong>Files List</strong></h1>

                    <div className='p-5 overflow-y-auto max-h-96'>
                        {data && data?.map((item, index) =>
                            <div
                                key={index}
                                style={{ cursor: 'pointer' }}
                                className='bg-gray-800 hover:bg-blue-400 rounded-lg my-2 text-gray-200 px-3 py-2 flex justify-between'>
                                <div>{item.name}</div>
                                <div className='flex space-x-4'>
                                    <div
                                        className='bg-red-500 hover:bg-gray-600 rounded-lg px-2'
                                        onClick={() => openModal(item)}
                                    >
                                        <div className='flex items-center'>
                                            <BsFillTrashFill className='mr-1' />
                                            Trash
                                        </div>

                                    </div>
                                    <div
                                        className='bg-blue-500 hover:bg-gray-600 rounded-lg px-2'
                                        onClick={() => window.open(item.webViewLink, '_blank')}
                                    >
                                        <div className='flex items-center'>
                                            <BsEye className='mr-1' />
                                            View
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
