import axios from "axios";

const BASE_URL = "https://api.inaturalist.org/v1/observations";
const USER_ID = "jwaltrip"; // Replace with your iNaturalist username

/**
 * Get unique species observed by a user.
 */
export async function getObservedSpecies() {
    let species = new Set();
    let page = 1;

    while (true) {
        const url = `${BASE_URL}?user_id=${USER_ID}&order=desc&order_by=created_at&per_page=100&page=${page}`;
        const { data } = await axios.get(url);
        const observations = data.results;

        if (!observations.length) break;

        observations.forEach(obs => species.add(obs.species_guess));
        page++;
    }

    return Array.from(species);
}

/**
 * Get unique dive locations where user has observed species.
 */
export async function getObservedLocations() {
    let locations = new Set();
    let page = 1;

    while (true) {
        const url = `${BASE_URL}?user_id=${USER_ID}&order=desc&order_by=created_at&per_page=100&page=${page}`;
        const { data } = await axios.get(url);
        const observations = data.results;

        if (!observations.length) break;

        observations.forEach(obs => locations.add(obs.place_guess));
        page++;
    }

    return Array.from(locations);
}

/**
 * Get species observed by everyone at a given location in the last 30 days.
 */
export async function getRecentSpeciesByLocation(location) {
    let species = new Set();
    let page = 1;
    const TAXA = "47178"; // Ray-finned fishes
    const LAST_30_DAYS = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];

    while (true) {
        const url = `${BASE_URL}?place_guess=${encodeURIComponent(location)}&taxon_id=${TAXA}&d1=${LAST_30_DAYS}&order=desc&order_by=created_at&per_page=100&page=${page}&identifications=most_agree&popular=true`;
        const { data } = await axios.get(url);
        const observations = data.results;

        if (!observations.length) break;

        observations.forEach(obs => species.add(obs.species_guess));
        page++;
    }

    return Array.from(species);
}
