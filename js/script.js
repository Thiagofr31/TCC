// Sistema de autenticação e controle de acesso
class AuthSystem {
    constructor() {
        this.users = [
            { email: "admin@conectallub.com", password: "admin123", name: "Administrador" },
            { email: "usuario@empresa.com", password: "senha123", name: "Usuário Teste" }
        ];
    }

    isLoggedIn() {
        return localStorage.getItem('userLoggedIn') === 'true';
    }

    getUserInfo() {
        return {
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail')
        };
    }

    setLoggedIn(user) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
    }

    logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const auth = new AuthSystem();
    
    // Controla a visibilidade do formulário de contato
    updateContactSection();
    
    // Atualiza o menu de usuário
    updateUserMenu();
    
    // Configura o formulário de contato (se estiver visível)
    setupContactForm();
    
    // Smooth scroll
    setupSmoothScroll();
});

// Atualiza a seção de contato baseado no login
function updateContactSection() {
    const auth = new AuthSystem();
    const loginRequired = document.getElementById('loginRequired');
    const contactFormContainer = document.getElementById('contactFormContainer');
    const userWelcome = document.getElementById('userWelcome');

    if (auth.isLoggedIn()) {
        // Usuário LOGADO - mostra formulário
        loginRequired.style.display = 'none';
        contactFormContainer.style.display = 'block';
        
        const userInfo = auth.getUserInfo();
        userWelcome.innerHTML = `
            <div class="welcome-text">
                <h3>👋 Olá, ${userInfo.name}!</h3>
                <p>Estamos felizes em tê-lo conosco. Envie sua mensagem e responderemos em breve.</p>
            </div>
        `;
    } else {
        // Usuário NÃO LOGADO - mostra mensagem de login
        loginRequired.style.display = 'block';
        contactFormContainer.style.display = 'none';
    }
}

// Atualiza o menu de navegação
function updateUserMenu() {
    const auth = new AuthSystem();
    const userMenu = document.getElementById('userMenu');
    const loginMenu = document.getElementById('loginMenu');
    
    if (auth.isLoggedIn()) {
        const userInfo = auth.getUserInfo();
        if (userMenu) {
            document.getElementById('userName').textContent = userInfo.name;
            userMenu.style.display = 'flex';
        }
        if (loginMenu) loginMenu.style.display = 'none';
    } else {
        if (userMenu) userMenu.style.display = 'none';
        if (loginMenu) loginMenu.style.display = 'block';
    }
}

// Configura o formulário de contato
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const auth = new AuthSystem();
            if (!auth.isLoggedIn()) {
                alert('Você precisa estar logado para enviar mensagens!');
                window.location.href = 'login.html';
                return;
            }
            
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            // Simulação de envio
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Para usar em outras páginas
const auth = new AuthSystem();