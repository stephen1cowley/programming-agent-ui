import axios from "axios";

interface imDelSchema {
    fileName: string
}

export const uploadFile = async (file: File, uploadUrl: string) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await axios.post(uploadUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log("File uploaded successfully", response);
    } catch (error) {
        console.error("Error uploading file", error);
    }
}

export const deleteFile = async (fileName: string, uploadUrl: string) => {
    const postData: imDelSchema = {
        fileName: 'uploads/' + fileName
    }

    try {
        const response = await axios.post(uploadUrl, postData)
        console.log("File deleted successfully", response);
    } catch (error) {
        console.error("Error deleting file", error);
    }
}

