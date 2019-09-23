import { Storage } from '@google-cloud/storage'

const storage = new Storage({
    projectId: "canvas-253619",
    keyFilename: "src/config/canvas-f748379b1d32.json"
})
const bucket = storage.bucket('canvas-images');

export const uploadFile = async (file) => {
    if (!file) {
        return
    }
    return bucket.upload(file.path, {
        gzip: true,
        destination: `avatars/${Date.now()}-${file.name}`,
        metadata: {
            type: file.type,
            cacheControl: 'public, max-age=31536000',
        },
    })
}

export const deleteFile = async (name) => {
    if (!name) {
        return
    }
    return bucket.file(name).delete()
}

export const downloadFile = async (name) => {
    if (!name) {
        return
    }
    return bucket.file(name).download()
}

export const getUrl = async (name) => {
    if (!name) {
        return
    }
    
    const date = new Date()
    const expire = date.setHours(date.getHours() + 24)

    const url = await bucket.file(name).getSignedUrl({
        action: 'read',
        expires: new Date(expire).toISOString()
    })

    if (!url) {
        return
    }
    
    return url[0]
}

