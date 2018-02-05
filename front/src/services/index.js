
const url = "https://back-yirytgzpcw.now.sh"

export const getGiftsService = async () => {
    const data = await fetch(`${url}/`)
    const json = await data.json()
    console.log('service', json)
    return json
}

export const addGiftService = async (gift) => {
    const data = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gift)
    })
    const json = await data.json()
    return json
}

export const removeGiftService = async (id) => {
    const data = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
    const json = await data.json()
    return json
}

export const sendGiftsService = async () => {
    const data = await fetch(`${url}/notify`)
    const json = await data.json()
    return json
}
