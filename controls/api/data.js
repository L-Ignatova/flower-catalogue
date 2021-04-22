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

export async function createFlower({name, stems, imageUrl, height, small, medium, big}, userId) {
    try {
        const response = await fetch(`${baseUrl}/flowers.json`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'stems': stems,
                'imageUrl': imageUrl,
                'height': height,
                'price': {
                    'small': small,
                    'medium': medium,
                    'big': big
                },
                'creator': userId
            })
        });
        const result = await response.json();
        return result;
    } catch(err) {
        throw new Error(err.message);
    }
}

export async function editFlower(data, id) {
    try {
        const response = await fetch(`${baseUrl}/flowers/${id}.json`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch(err) {
        throw new Error(err.message);
    }
}