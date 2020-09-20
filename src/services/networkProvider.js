let endpoint = null

const headers = {
  'content-type': 'application/json'
}

export const initWithEndpoint = (url) => {
  endpoint = url
}

export const get = async (resource) => {
  return fetch( [endpoint, resource].join('/') ).then((res) => res.json())
    .then(res => {
      return res
    });
}

export const create = async (resource, item) => {
  return fetch( [endpoint, resource].join('/'), { headers, body: JSON.stringify(item), method: 'POST' } ).then((res) => res.json()).then((res) => {
    return res
  })
}

export const remove = async (resource, id) => {
  try {
    const result = await fetch( [endpoint, resource, id].join('/'), { headers, method: 'DELETE' } )
    console.log('result: ', result )
    return {
      success: result.status === 200,
    }
  }
  catch (error) {
    return {
      success: null
    }
  }
}

export const update = async (resource, id, item) => {
  return fetch( [endpoint, resource, id].join('/'), { headers, body: JSON.stringify(item), method: 'PUT' } ).then((res) => res.json()).then((res) => {
    // console.log('res', res)
  })
}