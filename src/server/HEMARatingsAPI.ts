const APIUrl = 'https://hemaratingspublicapi.azurewebsites.net/api'

const DefaultOptions = {
    "method": 'GET',
    "headers": {
        "x-functions-key": process.env.HEMARatingsAPIKey!
    }
}

export async function HEMARatingsFighterSearch(name: string, includeRating: boolean = false): Promise<any> {
    return HEMARatingsAPIRequest(`${APIUrl}/fighters/search/${name}?includeRating=${includeRating}`)
}

async function HEMARatingsAPIRequest(url: string): Promise<any> {
    return fetch(url, DefaultOptions).then((APIResponse): Promise<any> => {
        if (!APIResponse.ok) {
            throw new Error(`HTTP error! Status: ${APIResponse.status}`)
        }
        return APIResponse.json()
    })
}
