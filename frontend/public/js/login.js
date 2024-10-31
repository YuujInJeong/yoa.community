document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');
    const emailInput = document.getElementById('id');
    const pwInput = document.getElementById('pw');
    const emailHelper = document.getElementById('emailHelper');
    const pwHelper = document.getElementById('pwHelper');

    // 이메일 유효성 검사
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 비밀번호 유효성 검사
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordRegex.test(password);
    }

    // 입력값 검증
    function validateInputs(showHelpers = false) {
        const email = emailInput.value;
        const password = pwInput.value;
        let isValid = true;

        // 이메일 검증
        if (!email) {
            emailHelper.textContent = showHelpers ? "* 이메일을 입력해주세요." : "";
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailHelper.textContent = showHelpers ? "* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)" : "";
            isValid = false;
        } else {
            emailHelper.textContent = "";
        }

        // 비밀번호 검증
        if (!password) {
            pwHelper.textContent = showHelpers ? "* 비밀번호를 입력해주세요" : "";
            isValid = false;
        } else if (!isValidPassword(password)) {
            pwHelper.textContent = showHelpers ? "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다." : "";
            isValid = false;
        } else {
            pwHelper.textContent = "";
        }

        // 버튼 상태 업데이트
        loginButton.style.backgroundColor = isValid ? '#7F6AEE' : '#ACAOEB';
        loginButton.disabled = !isValid;

        return isValid;
    }

    // 호버 이벤트
    loginButton.addEventListener('mouseenter', function() {
        if (!loginButton.disabled) {
            this.style.backgroundColor = '#7c3aed';
            this.style.color = 'white';
        }
    });

    loginButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = loginButton.disabled ? '#ACAOEB' : '#7F6AEE';
        this.style.color = loginButton.disabled ? 'black' : 'white';
    });

    // Focus and blur events to show helper text only when the user interacts with the inputs
    emailInput.addEventListener('focus', () => validateInputs(true));
    pwInput.addEventListener('focus', () => validateInputs(true));

    emailInput.addEventListener('blur', () => validateInputs(false));
    pwInput.addEventListener('blur', () => validateInputs(false));

    // 입력 이벤트 리스너 (실시간 검증)
    emailInput.addEventListener('input', () => validateInputs(true));
    pwInput.addEventListener('input', () => validateInputs(true));

    // 로그인 버튼 클릭 이벤트
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (validateInputs(true)) {
            this.style.backgroundColor = '#4c1d95';
            
            // 3초 후 페이지 이동
            setTimeout(() => {
                window.location.href = 'board.html';
            }, 3000);
        }
    });

    // 초기 버튼 상태 설정
    validateInputs();
});