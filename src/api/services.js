const URL_cryptocompare = 'https://min-api.cryptocompare.com/data'
const URL_ror = 'http://127.0.0.1:3000/api'

export const getTopCripto = async (props) => {
    try {
        const response = await fetch(`${URL_cryptocompare}/top/mktcapfull?limit=10&tsym=USD`);
        if (!response.ok) {
            throw new Error(`La solicitud falló con estado ${response.status}`);
        }
        const data = await response.json();
        return data.Data;
    } catch (error) {
        console.error('Error durante la solicitud:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que sea manejado por el llamador
    }
}

export const getCriptoRor = async (props) => {
    try {
        const response = await fetch(`${URL_ror}/criptos`);
        if (!response.ok) {
            throw new Error(`La solicitud falló con estado ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error durante la solicitud:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que sea manejado por el llamador
    }
}
export const getCalculateRor = async (props) => {
    const { newData } = props
    try {
        const response = await fetch(`${URL_ror}/investment/calculate_profit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error(`La solicitud falló con estado ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error durante la solicitud:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que sea manejado por el llamador
    }
}