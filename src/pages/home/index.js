import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.60.44:5000/account');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='bg-gray-800 h-screen'>
                <Navbar />
                <div className='bg-black rounded-lg mx-3 h-4/5 mt-5'>
                    <div className='p-5'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none"
                        />
                    </div>
                    <h1 className='text-gray-200 ml-5'><strong>Files List</strong></h1>

                    <div className='p-5 overflow-y-auto max-h-96'>
                        {data && data?.map((item, index) =>
                            <div
                                key={index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => window.open(item.webViewLink, '_blank')}
                                className='bg-gray-800 hover:bg-blue-400 rounded-lg my-2 text-gray-200 px-3'>
                                {item.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
