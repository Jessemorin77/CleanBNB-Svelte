import { json, error } from "@sveltejs/kit";

interface YelpLocation {
  address1: string;
  // Include other location fields if needed
}

interface YelpBusiness {
  name: string;
  location: YelpLocation;
  phone: string;
  rating: number;
  image_url: string;
  // Add other fields from Yelp response as needed
}

interface Business {
  name: string;
  address: string;
  phone: string;
  rating: number;
  imageUrl: string;
  // Define other fields for your formatted data as needed
}

export async function POST({request}) {

    const requestBody = await request.json();
  const { zipCode, service } = requestBody;
  console.log({zipCode, service})
  const url = "https://api.yelp.com/v3/businesses/search";
  const params = new URLSearchParams({
    sort_by: 'best_match',
    limit: '20',
    location: zipCode, // Use the zipCode from the request
    term: service, // Use the service type from the request
    radius: '5000',
    categories: service.toLowerCase(), // Optional: Adjust as per Yelp's category formats
  });
  const YELP_API_KEY = "XEo0MexiiNG39UdJhsHbv7E3IHYLF6YIw7L6nY81VuseRAVKz3Ks1YC6EoGJxAhIb6GMimLxf9chz85SS79dRILrqMEaHa2PW_PyjSoTZ5aBFb-Ysok7F11QO9NeZXYx"; // Replace with your actual API key

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + YELP_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const formattedData: Business[] = data.businesses.map((business: YelpBusiness) => ({
      name: business.name,
      address: business.location.address1,
      phone: business.phone,
      rating: business.rating,
      imageUrl: business.image_url,
      // Map other fields as needed
    }));
    console.log(formattedData)
    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Failed to fetch data from Yelp API', error);
    throw error;
  }
}
