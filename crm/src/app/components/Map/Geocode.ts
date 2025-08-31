import { City } from '@/app/lib/api'; 

export interface GeocodedCityData extends City {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds: [
    [number, number], // south, west - lat, lon
    [number, number], // north, east - lat, lon
  ];
  raw: any; // raw provider result
}

export async function geocodeCities(cities: City[]): Promise<GeocodedCityData[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  const { OpenStreetMapProvider } = await import('leaflet-geosearch');
  const provider = new OpenStreetMapProvider();

  const geocodeResults = await Promise.all(
    cities.map(async (city) => {
      try {
        const results = await provider.search({ query: `${city.title}, ${city.countryTitle}` });
        return results.length > 0 ? { ...city, ...results[0] } : null;
      } catch (error) {
        console.error(`Error geocoding city: ${city.title}, ${city.countryTitle}`, error);
        return null;
      }
    })
  );

  return geocodeResults.filter(
    (city): city is GeocodedCityData =>
      city !== null && city.x !== undefined && city.y !== undefined,
  );
}

