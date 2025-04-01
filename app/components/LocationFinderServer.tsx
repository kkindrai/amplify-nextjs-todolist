
// Import the Packages


export default async function locationFinderServer() { // maKE THIS A ASYNC FUNCTION


        const response = await fetch('https://apip.cc/json');
        const locationData = await response.json();
        console.log(locationData);
        const locationInfo = locationData;



    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h1>Location Finder (Server)</h1>
                </div>
                <div className="card-body">
                    <h2><code>{locationInfo?.City}, {locationInfo?.RegionCode}</code></h2>
                </div>
            </div>
        </>
    )
}