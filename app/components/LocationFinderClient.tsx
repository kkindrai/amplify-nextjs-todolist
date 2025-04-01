'use client';

// Import the Packages
import { useEffect, useState } from "react"

export default function locationFinderClient() { 
    const [locationInfo, setLocationInfo] = useState({}) // USE STATE USES ARRAY, NOT {}

    const getLocationInfo = async () => {
        const response = await fetch('https://apip.cc/json');

        console.log(response);

        const locationData = await response.json();

        console.log(locationData);

        setLocationInfo(locationData);
    }


    useEffect(() => {
        getLocationInfo();
    }, []) // make sure to add this array <-- ensures api is only called once

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h1>Location Finder (Client)</h1>
                </div>
                <div className="card-body">
                    <h2><code>{locationInfo?.City}, {locationInfo?.RegionCode}</code></h2>
                </div>
            </div>
        </>
    )
}