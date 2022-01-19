(() => {
    const root = document.querySelector('#root');
    const loginFormTemplate = document.querySelector('#login-form-template');

    const { content } = loginFormTemplate.cloneNode(true);
  
    root.appendChild(content);

    const loginForm = document.querySelector('#login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.querySelector('#username').value;
        const pwd = document.querySelector('#password').value;

        const user = {
            name,
            pwd
        };

        document.querySelector('#username').value = '';
        document.querySelector('#password').value = '';
        
        const body = JSON.stringify(user);

        const serverData = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body,
            headers: {
                'content-type': 'application/json',
                'content-length': body.length
            }
        });
        console.log(serverData);
    })

})();