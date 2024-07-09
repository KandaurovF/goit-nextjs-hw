import { Country } from '@/app/lib/api'; 

export interface GeocodedCountryData extends Country {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds: [
    [number, number], // south, west - lat, lon
    [number, number], // north, east - lat, lon
  ];
  raw: any; // raw provider result
}

export async function geocodeCountries(countries: Country[]): Promise<GeocodedCountryData[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  const { OpenStreetMapProvider } = await import('leaflet-geosearch');
  const provider = new OpenStreetMapProvider();

  const geocodeResults = await Promise.all(
    countries.map(async (country) => {
      const results = await provider.search({ query: country.countryTitle });
      return results.length > 0 ? { ...country, ...results[0] } : null;
    })
  );

  return geocodeResults.filter(
    (country): country is GeocodedCountryData =>
      country !== null && country.x !== undefined && country.y !== undefined,
  );
}
