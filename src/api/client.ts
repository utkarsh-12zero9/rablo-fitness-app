const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ManagerProfile {
    _id: string;
    email: string;
    name: string;
    role: string;
    accCreated: number;
}

export interface CreateProfileData {
    contactNumber: string;
    dob: string;
    gender: string,
    role: string;
    coordinates: number[];
    city: string;
    state: string;
    country: string;
    pincode: string;
    name?: string;
    email?: string;
}

export const api = {
    getBasicProfile: async (managerID: string): Promise<any> => {
        const response = await fetch(`${BASE_URL}/manager/getBasicProfile/${managerID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        return response.json();
    },

    createManagerProfile: async (managerID: string, data: CreateProfileData): Promise<any> => {
        const url = `${BASE_URL}/manager/createManagerProfile/${managerID}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to create profile: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return response.json();
    },
};