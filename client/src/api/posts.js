import { API_BASE_URL } from './index.js'

const posts_url = API_BASE_URL + '/posts'

const posts = {
    async all() {
        try {
            const response = await fetch(posts_url)
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    },
    async get(id) {
        try {
            const response = await fetch(`${posts_url}/${id}`)
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    },
    async create(post) {
        try {
            const response = await fetch(posts_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    },
    async update(id, post) {
        try {
            const response = await fetch(`${posts_url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    },
    async delete(id) {
        try {
            const response = await fetch(`${posts_url}/${id}`, {
                method: 'DELETE',
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    },
}

export default posts
