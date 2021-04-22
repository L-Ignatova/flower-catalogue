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

export async function getFlowerById(id) {
    try {
        const response = await fetch(`${baseUrl}/flowers/${id}.json`);
        const data = await response.json();
        return data;
    } catch(err) {
        throw new Error(err.message);
    }
}

export async function deleteFlower(id) {
    try {
        const response = await fetch(`${baseUrl}/flowers/${id}.json`, {
            method: 'delete',
        });
        const data = await response.json();
        return data;
    } catch(err) {
        throw new Error(err.message);
    }
}