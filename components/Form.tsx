"use client";

import { useState } from "react";

type Asteroid = {
    absolute_magnitude_h: number;
    name: string;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    nasa_jpl_url: string;
    neo_reference_id: string;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_max: number;
            estimated_diameter_min: number;
        }
    }
    close_approach_data: {
        [day: string]: {
            close_approach_date: string;
            close_approach_date_full: string;
            epoch_date_close_approach: number;
            miss_distance: {
                kilometers: number;
            }
            orbiting_body: string;
            relative_velocity: {
                kilometers_per_hour: number;
                kilometers_per_second: number;
            }
        }
    }
}

type ApiResponse = {
    element_count: number;
    links: {
        next: string;
        prev: string;
        self: string;
    };
    near_earth_objects: {
        [day: string]: Asteroid[];
    }
}

export default function SearchByDateForm() {

    const fetchAsteroids = async (startDate: string, endDate: string) => {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`);
        const data: ApiResponse = await response.json();
        setAsteroids(data);
    }

    const [asteroids, setAsteroids] = useState<ApiResponse>({} as ApiResponse);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <>
            <div className="grid">
                <label htmlFor="start-date">
                    Start Date
                    <input type="date" id="start-date" name="start-date" onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label htmlFor="end-date">
                    End Date (maximum 7 days from start date)
                    <input type="date" id="end-date" name="end-date" onChange={(e) => setEndDate(e.target.value)} />
                </label>
            </div>
            <div className="container">
                <button onClick={(_) => fetchAsteroids(startDate, endDate)}>Search</button>
            </div>
            <div className="container">
                {
                    Object.keys(asteroids.near_earth_objects || {}).map((day) => {
                        return (
                            <div key={day}>
                                <h2>{day}</h2>
                                <ul>
                                    {
                                        (asteroids.near_earth_objects || {})[day].map((asteroid) => {
                                            return (
                                                <article>
                                                    <header>ASTEROID:  {asteroid.name}</header>
                                                    Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km<br />
                                                    Close Approach Date: {asteroid.close_approach_data[0].close_approach_date_full}<br />
                                                    Miss Distance: {Math.round(asteroid.close_approach_data[0].miss_distance.kilometers)} km<br />
                                                    Relative Velocity: {Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h<br />
                                                    Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes, do panic' : 'not wiping us yet'}<br />
                                                </article>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}