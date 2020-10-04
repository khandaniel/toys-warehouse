import { baseUrl } from '../config'

const initialSettings = {
    headers: { 'content-type': 'application/json' }
}

export const requestApi = async (route, data, settings) => {
    try {
        const response = await fetch([baseUrl, route].join('/'), {
            ...initialSettings,
            ...settings,
            headers: {
                ...initialSettings.headers,
                ...settings.headers
            },

            body: settings.method === 'GET' ? null : JSON.stringify(data)
        })
        const responseData = await response.json()

        return responseData
    } catch (error) {
        return error
    }
}