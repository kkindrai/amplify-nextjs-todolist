'use client';

// Import the Packages
import { useEffect, useState } from "react"

export default function locationFinderClient() { 
    const [locationInfo, setLocationInfo] = useState({City: 'N/A'}) // USE STATE USES ARRAY, NOT {} 
                            // && useState(null) null instead of {} to have an unavailable message status

    const getLocationInfo = async () => {
        const response = await fetch('https://apip.cc/json');
        const locationData = await response.json();
        console.log(locationData);

        // Set the Data
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

                    {/* If locationInfo ==> */}
                    {locationInfo 
                        ? <h2><code>{locationInfo.City}, </code></h2> 
                        : <h2>Location Data Currently Unavailable.</h2>
                    }
                    
                </div>
            </div>
        </>
    )
}