const NGL_ENDPOINT = 'https://ngl.link/api/submit';
const TARGET_USERNAME = 'lemon39341';
const MESSAGE = '/gb';

function clearCookies() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
}

function runFetchRequests(x) {
    const url = NGL_ENDPOINT;
    const userAgents = [
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.4 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/13.7 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/12.4 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/11.3 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/10.3 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.4 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.7 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Mobile/15E148 Safari/604.1',
    ];

    function getRandomUserAgent() {
        const randomIndex = Math.floor(Math.random() * userAgents.length);
        return userAgents[randomIndex];
    }

    function clearSessions() {
        localStorage.clear();
        sessionStorage.clear();
        clearCookies();
    }

    function performRequest() {
        const data = new URLSearchParams({
            username: TARGET_USERNAME,
            question: MESSAGE,
            deviceId: '',
            gameSlug: '',
            referrer: ''
        });

        const randomUserAgent = getRandomUserAgent();

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'DNT': '1',
                'Origin': 'https://ngl.link',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': randomUserAgent,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data.toString()
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    for (let i = 0; i < x; i++) {
        performRequest()
            .then(() => {
                clearSessions();
            });
    }
}
runFetchRequests(20);