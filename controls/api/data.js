const apiKey = 'AIzaSyBKSWuGdwmN3RaH01U0N3mi5PhRtCyr7Xo';
const baseUrl = 'https://flower-shop-demo-c4c3b-default-rtdb.firebaseio.com'

export async function getFlowers() {
    try {
        const response = await fetch(`${baseUrl}/flowers/.json`);
        const data = await response.json();
        return data;
    } catch(err) {
        throw new Error(err.message);
    }
}