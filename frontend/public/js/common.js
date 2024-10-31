// common.js
const BASE_URL = 'http://localhost:3000';

// 공통으로 사용할 fetch 함수
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}

// 로그인 상태 확인
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        return JSON.parse(user);
    }
    return null;
}

// 페이지 이동 함수
function navigateTo(page) {
    window.location.href = `/${page}.html`;
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 숫자 포맷팅 (1000 -> 1k)
function formatNumber(num) {
    if (num >= 100000) return `${Math.floor(num / 1000)}k`;
    if (num >= 10000) return `${Math.floor(num / 1000)}k`;
    if (num >= 1000) return `${Math.floor(num / 1000)}k`;
    return num.toString();
}

export {
    fetchData,
    checkLoginStatus,
    navigateTo,
    formatDate,
    formatNumber,
    BASE_URL
};