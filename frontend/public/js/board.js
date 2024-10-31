// DOM 요소 선택
const postList = document.querySelector('.post-list');
const writeButton = document.querySelector('.write-button');

// 게시글 목록 가져오기
async function fetchPosts() {
    try {
        const response = await fetch('/data/posts.json');
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// 게시글 HTML 생성
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p class="post-info">
            <span>작성자: ${post.author}</span>
            <span>조회수: ${post.views}</span>
        </p>
    `;
    
    // 게시글 클릭 이벤트
    postElement.addEventListener('click', () => {
        window.location.href = `/board-detail.html?id=${post.id}`;
    });
    
    return postElement;
}

// 게시글 목록 렌더링
async function renderPosts() {
    const posts = await fetchPosts();
    postList.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postList.appendChild(postElement);
    });
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    
    // 글쓰기 버튼 이벤트
    if (writeButton) {
        writeButton.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('user');
            if (isLoggedIn) {
                window.location.href = '/board-write.html';
            } else {
                alert('로그인이 필요합니다.');
                window.location.href = '/login.html';
            }
        });
    }
});

// 무한 스크롤 구현
let page = 1;
const postsPerPage = 10;

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        page++;
        renderPosts();
    }
});