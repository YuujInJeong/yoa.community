// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pw');
const passwordCheckInput = document.getElementById('pwck');
const nicknameInput = document.getElementById('nickname');
const profileInput = document.getElementById('profile');
const signupButton = document.getElementById('signupBtn');
const backButton = document.querySelector('.back');

// Helper text elements
const emailHelper = document.querySelector('.helperText[name="email"]');
const passwordHelper = document.querySelector('.helperText[name="pw"]');
const passwordCheckHelper = document.querySelector('.helperText[name="pwck"]');
const nicknameHelper = document.querySelector('.helperText[name="nickname"]');

// Form validation state
const formState = {
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
    profile: false
};

// Validation patterns
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Email validation
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    
    if (!email) {
        emailHelper.textContent = '*이메일을 입력해주세요.';
        formState.email = false;
    } else if (!EMAIL_PATTERN.test(email)) {
        emailHelper.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        formState.email = false;
    } else {
        // Here you would typically check for email duplication with the server
        checkEmailDuplication(email).then(isDuplicate => {
            if (isDuplicate) {
                emailHelper.textContent = '*중복된 이메일 입니다.';
                formState.email = false;
            } else {
                emailHelper.textContent = '';
                formState.email = true;
            }
            updateSignupButton();
        });
    }
    updateSignupButton();
});

// Password validation
passwordInput.addEventListener('blur', () => {
    const password = passwordInput.value;
    
    if (!password) {
        passwordHelper.textContent = '*비밀번호를 입력해주세요';
        formState.password = false;
    } else if (!PASSWORD_PATTERN.test(password)) {
        passwordHelper.textContent = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        formState.password = false;
    } else {
        passwordHelper.textContent = '';
        formState.password = true;
    }
    validatePasswordCheck();
    updateSignupButton();
});

// Password check validation
passwordCheckInput.addEventListener('blur', validatePasswordCheck);

function validatePasswordCheck() {
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;
    
    if (!passwordCheck) {
        passwordCheckHelper.textContent = '*비밀번호를 한번더 입력해주세요';
        formState.passwordCheck = false;
    } else if (password !== passwordCheck) {
        passwordCheckHelper.textContent = '*비밀번호가 다릅니다.';
        formState.passwordCheck = false;
    } else {
        passwordCheckHelper.textContent = '';
        formState.passwordCheck = true;
    }
    updateSignupButton();
}

// Nickname validation
nicknameInput.addEventListener('blur', () => {
    const nickname = nicknameInput.value.trim();
    
    if (!nickname) {
        nicknameHelper.textContent = '*닉네임을 입력해주세요.';
        formState.nickname = false;
    } else if (nickname.includes(' ')) {
        nicknameHelper.textContent = '*띄어쓰기를 없애주세요';
        formState.nickname = false;
    } else if (nickname.length > 10) {
        nicknameHelper.textContent = '*닉네임은 최대 10자 까지 작성 가능합니다.';
        formState.nickname = false;
    } else {
        // Check nickname duplication with the server
        checkNicknameDuplication(nickname).then(isDuplicate => {
            if (isDuplicate) {
                nicknameHelper.textContent = '*중복된 닉네임 입니다.';
                formState.nickname = false;
            } else {
                nicknameHelper.textContent = '';
                formState.nickname = true;
            }
            updateSignupButton();
        });
    }
    updateSignupButton();
});

// Profile image handling
profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            formState.profile = true;
        } else {
            formState.profile = false;
            alert('이미지 파일만 업로드 가능합니다.');
            profileInput.value = '';
        }
    } else {
        formState.profile = false;
    }
    updateSignupButton();
});

// Update signup button state
function updateSignupButton() {
    const isValid = Object.values(formState).every(value => value === true);
    signupButton.disabled = !isValid;
    signupButton.style.backgroundColor = isValid ? '#7F6AEE' : '#ACA0EB';
}

// Signup button click handler
signupButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (Object.values(formState).every(value => value === true)) {
        try {
            const formData = new FormData();
            formData.append('email', emailInput.value.trim());
            formData.append('password', passwordInput.value);
            formData.append('nickname', nicknameInput.value.trim());
            formData.append('profile', profileInput.files[0]);
            
            // Here you would typically send the form data to your server
            const response = await submitSignupForm(formData);
            
            if (response.success) {
                window.location.href = 'login.html';
            } else {
                alert('회원가입 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }
});

// Back button handler
backButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Mock API functions (replace these with actual API calls)
async function checkEmailDuplication(email) {
    // Implement actual API call
    return false;
}

async function checkNicknameDuplication(nickname) {
    // Implement actual API call
    return false;
}

async function submitSignupForm(formData) {
    // Implement actual API call
    return { success: true };
}


document.querySelector('.back').addEventListener('click', () => {
    window.location.href = 'login.html';
});