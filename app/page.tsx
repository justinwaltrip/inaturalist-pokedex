'use client'

import { useEffect, useState } from "react";
import { getObservedSpecies, getObservedLocations, getRecentSpeciesByLocation } from "../lib/inaturalist";

export default function Home() {
    const [observedSpecies, setObservedSpecies] = useState([]);
    const [diveLocations, setDiveLocations] = useState([]);
    const [speciesByLocation, setSpeciesByLocation] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const species = await getObservedSpecies();
            const locations = await getObservedLocations();
            
            let speciesLocationData = {};
            for (const location of locations) {
                console.log(`Fetching data for ${location}...`);
                speciesLocationData[location] = await getRecentSpeciesByLocation(location);
            }

            setObservedSpecies(species);
            setDiveLocations(locations);
            setSpeciesByLocation(speciesLocationData);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-xl">Loading...</div>;
    }

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">My Critterpedia</h1>

            <h2 className="text-2xl mt-5">Observed Species</h2>
            <ul className="list-disc pl-5">
                {observedSpecies.map((species) => (
                    <li key={species}>{species}</li>
                ))}
            </ul>

            <h2 className="text-2xl mt-5">Dive Locations</h2>
            <ul className="list-disc pl-5">
                {diveLocations.map((location) => (
                    <li key={location}>{location}</li>
                ))}
            </ul>

            <h2 className="text-2xl mt-5">Species Seen at Each Location</h2>
            {Object.keys(speciesByLocation).map((location) => (
                <div key={location} className="mb-5">
                    <h3 className="text-xl font-semibold">{location}</h3>
                    <ul className="list-disc pl-5">
                        {speciesByLocation[location].map((species) => (
                            <li key={species}>{species}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}