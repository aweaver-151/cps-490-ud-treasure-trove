import axios from 'axios'

export const getPosts = async (queryParams) => {
  try {
    console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL)
    tempurl = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BACKEND_URL
    const url = new URL('posts', tempurl)

    Object.entries(queryParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
    })

    const res = await fetch(url.toString())
    return await res.json()
  } catch (err) {
    console.error('error fetching posts:', err)
  }
}

export const createPost = async (token, post, image, selectedDate) => {
  try {
    const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}upload`
    const formData = new FormData()
    const dateObj = new Date(selectedDate)
    formData.append('file', image)
    const file = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    const url = `${import.meta.env.VITE_BACKEND_URL}posts`
    post['imagepath'] = file.data.filename
    post['enddate'] = dateObj
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
    return await res.json()
  } catch (err) {
    console.error('error creating posts:', err)
  }
}
