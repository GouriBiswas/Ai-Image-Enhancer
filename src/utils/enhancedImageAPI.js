import axios from "axios";

const API_KEY = "wxkh2eaz207dlwjnt";
const BASE_URL = "https://techhk.aoscdn.com/";         

const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
    try {
        const taskId = await uploadImage(file);
        console.log("Image Uploaded Successfully, Task ID:", taskId);

        const enhancedImageData = await fetchEnhancedImage(taskId);
        console.log("Enhanced Image Data:", enhancedImageData);

        console.log(enhancedImageData);
        // return enhancedImageData;
    } catch (error) {
        console.log("Error enhancing image:", error.message);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);

    const { data } = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-API-KEY": API_KEY,
            },
        }
    );


    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task ID not found.");
    }
    return data.data.task_id;
};


const fetchEnhancedImage = async (taskId) => {
    const { data } = await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );
    if (!data?.data) {
        throw new Error("Failed to fetch enhanced image! Image not found.");
    }

    return data.data;
};

// {status: 200, message: "success", data: {task_id: "187b1adc-b35f-46d7-8670-47f88f89fd73"}}

//{status: 200, message: 'success', data: {…}}
// data
// : 
// {task_id: '6c6cfd28-555d-48ff-8c2b-3b38e3261b6f'}

// data
// : 
// {task_id: '904b2160-0dc0-414e-8098-c0fef03d909b'}
// message
// : 
// "success"
// status
// : 
// 200