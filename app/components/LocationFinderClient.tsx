'use client';

// Import the Packages
import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner";

export default function locationFinderClient() { 
    
    // The Data States
    // -City, RegionName, CountryName, Longitude, Latitude, Temp
    const [city, setCity]           = useState('');
    const [region, setRegion]       = useState('');
    const [country, setCountry]     = useState('');
    const [temp, setTemp]         = useState('');
    const [isLoading, setIsLoading]  = useState(true);


    // ////////////////////////////////////////////////////
    // Calling the APIs
    const getAPIData = async () => {
        try {
            // Call first API
            const response01 = await fetch('https://apip.cc/json');
            const locationData = await response01.json();

            // Set the Data from this return
            setCity(locationData?.City);
            setRegion(locationData?.RegionName);
            setCountry(locationData?.CountryName);


            // Call Second API Using the lat & long values
            const url = "https://www.7timer.info/bin/astro.php?lon="
                + locationData?.Longitude
                + "&lat="
                + locationData?.Latitude
                + "&ac=0&unit=metric&output=json&tzshift=0";

                console.log(url);

            const response02 = await fetch(url);
            const weatherData = await response02.json();

            // Set the Data from this return
            setTemp(weatherData?.dataseries[0]?.temp2m);

            // Disable isLoading
            setIsLoading(false);

        } catch(error) {
        console.error(error);
    }
};

    useEffect(() => {

        getAPIData();
  
    }, []); // make sure to add this array <-- ensures api is only called once

    return (
        <>
            <h1>Location Finder (Client)</h1>
            <ul>
                {isLoading ? (
                    <li><LoadingSpinner /></li>
                ) : (
                    <>
                        <li>
                            Region Data:
                            <ul>
                                <li>{city}, {region}</li>
                                <li>{country}</li>
                            </ul>
                        </li>
                        <li>
                            Weather Data:
                            <ul>
                                <li>Temperature: <span>{temp}° C</span></li>
                            </ul>
                        </li>
                    </>
                )}
            </ul>

                              
        </>
    )
}