'use client';

// Import the Packages
import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner";

export default async function locationFinderClient() { 
    
    // GETTING LOCATION
    ///////////////////////////////////////////////////////
    const [locationInfo, setLocationInfo] = useState(
        {
            "City"          : 'unavailable',
            "RegionName"    : 'unavailable',
            "CountryName"   : 'unavailable',
            "Latitude"       : 'unavailable',
            "Longitude"      : 'unavailable',
        }
    ) // USE STATE USES ARRAY, NOT {} 


    const getLocationInfo = async () => {
        try {
            const response = await fetch('https://apip.cc/json');
            const locationData = await response.json();
            console.log(locationData);

            // Set the Data
            setLocationInfo(locationData);

        }catch(error) {
            console.error('first request failed', error)
        
        }
    }






    // GETTING WEATHER DATA
    ///////////////////////////////////////////////////////
    // const [weatherInfo, setWeatherInfo] = useState(
    //     {
    //         "product" : 'undefined',
    //         "dataseries" : [
                
    //         ]
    //     }
    // ) // USE STATE USES ARRAY, NOT {} 

    const [tempInfo, setTempInfo] = useState('unavailable');

    // Creating a state for Loading
    const [isLoading, setIsLoading] = useState(true);


    const getWeatherInfo = async (latitude?: string | undefined, longitude?: string | undefined) => {
        
        // If Location's Long & Lat != 'undefined'
        if(latitude != undefined && longitude != undefined) {

            // Create the API URL
            const url = "https://www.7timer.info/bin/astro.php?lon="
                + longitude
                + "&lat="
                + latitude
                + "&ac=0&unit=metric&output=json&tzshift=0";

            console.log(url);
            try {

                // Call the API
                const response = await fetch(url);
                const weatherData = await response.json();
                console.log(weatherData);

                // Set the Data
                setTempInfo(weatherData?.dataseries[0]?.temp2m);
                setIsLoading(false);
            }catch(error) {
                console.error('second request failed', error)
                setIsLoading(false);
            }

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getLocationInfo();
            await getWeatherInfo(locationInfo.Latitude, locationInfo.Longitude);
        };
    
        fetchData();
    }, []);
     // make sure to add this array <-- ensures api is only called once


    return (
        <>
            <h1>Location Finder (Client)</h1>
            <ul>
                <li>
                    Region Data:
                    <ul>
                        <li>{locationInfo.City}, {locationInfo.RegionName}</li>
                        <li>{locationInfo.CountryName}</li>
                    </ul>
                </li>
                <li>
                    Weather Data:
                    <ul>
                        <li>Temperature: {isLoading ? <LoadingSpinner /> : <span>{tempInfo}° C</span>}</li>
                    </ul>
                </li>
            </ul>
                              
        </>
    )
}