// Rate Limiter Queue for AI Requests
const requestQueue = [];
let isProcessingQueue = false;

const processQueue = async () => {
    if (isProcessingQueue || requestQueue.length === 0) return;
    isProcessingQueue = true;
    
    const { task, resolve, reject } = requestQueue.shift();
    
    try {
        const result = await task();
        resolve(result);
    } catch (e) {
        reject(e);
    }
    
    // Cooldown: 4 seconds between requests to prevent server overload
    setTimeout(() => {
        isProcessingQueue = false;
        processQueue();
    }, 4000);
};

// Wrapper to push tasks to queue
export const queueAIRequest = (task) => {
    return new Promise((resolve, reject) => {
        requestQueue.push({ task, resolve, reject });
        processQueue();
    });
};

