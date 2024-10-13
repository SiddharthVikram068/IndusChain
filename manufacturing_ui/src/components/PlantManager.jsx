import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../base_url.js'

const PlantManager = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlantId, setSelectedPlantId] = useState('');
    const [plantDetails, setPlantDetails] = useState(null);
    const [detailsError, setDetailsError] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch the list of plants owned by the user
    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const email = localStorage.getItem('email');

                console.log(email, token);
                const response = await axios.get(`${BASE_URL}/api/plants/owner/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // assuming the jwtToken is stored locally
                    }
                });
                setPlants(response.data);
            } catch (err) {
                setError('Failed to fetch plant list');
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, []);

    // Fetch plant details when selectedPlantId changes
    useEffect(() => {
        const fetchPlantDetails = async () => {
            if (!selectedPlantId) return;
            console.log(selectedPlantId);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/api/plants/details/${selectedPlantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setPlantDetails(response.data);
                setDetailsError(null);

            } catch (err) {
                setDetailsError('Failed to fetch plant details');
                setPlantDetails(null);
            }
        };

        fetchPlantDetails();
    }, [selectedPlantId, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>
                Plant List
            </h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <select
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid orange',
                        cursor: 'pointer',
                    }}
                    value={selectedPlantId}
                    onChange={(e) => setSelectedPlantId(e.target.value)}>
                        
                    <option value="" disabled>
                        Select Plant Name
                    </option>
                    {plants.map((plant) => (
                        <option key={plant.id} value={plant.id}>
                            {plant.name}
                        </option>
                    ))}
                </select>
            </div>


            {selectedPlantId && plantDetails && (
                <>
                <h2>Plant Details</h2>
                    <div style={{ backgroundColor: 'white', border: '2px solid orange', padding: '10px', marginTop: '20px' }}>
                        <p>Plant Name: {plantDetails.name}</p>
                        <p>Owner Email: {plantDetails.owner.email}</p>
                        <h3>Managers</h3>
                        <ul>
                            {plantDetails.managers.length > 0 ? (
                                plantDetails.managers.map((manager) => (
                                    <li key={manager.id}>{manager.email}</li>
                                ))
                            ) : (
                                <li>No managers assigned</li>
                            )}
                        </ul>
                        <h3>Engineers</h3>
                        <ul>
                            {plantDetails.engineers.length > 0 ? (
                                plantDetails.engineers.map((engineer) => (
                                    <li key={engineer.id}>{engineer.email}</li>
                                ))
                            ) : (
                                <li>No engineers assigned</li>
                            )}
                        </ul>
                    </div>
                </>
            )}

            {/* Show error if fetching plant details failed */}
            {detailsError && <p>{detailsError}</p>}
        </div>
    );
};

export default PlantManager;







