const serverUrl = "https://nothingbagel.com"

export async function server_POST(endpoint, args) {
    const url = `${serverUrl}/${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(args),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Server error');
        }
        return data;
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
}
export async function server_GET(endpoint) {
    const url = `${serverUrl}/${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Server error');
        }
        return data;
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
}