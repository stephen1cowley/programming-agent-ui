import axios from "axios";

const uploadFile = async (file: File, uploadUrl: string) => {
    const formData = new FormData()
    formData.append("file", file)
    console.log("Form Data:", formData.get("file"));

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

export default uploadFile
