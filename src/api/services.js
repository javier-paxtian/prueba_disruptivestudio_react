const URL_cryptocompare = 'https://min-api.cryptocompare.com/data'

export const getMenuJson = async (props) => {
    const { name } = props
    try {
        const response = await fetch(`${URL_cryptocompare}/top/mktcapfull?limit=10&tsym=USD`);
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