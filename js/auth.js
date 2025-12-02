// ====== CONFIG DO SUPABASE ======
const supabaseUrl = "https://drcluokqttmmxgzhvqon.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyY2x1b2txdHRtbXhnemh2cW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjg0MTAsImV4cCI6MjA3OTgwNDQxMH0.QxQcVxqvF9N3O1phRrVKob-ePItkgb64m0WvfCGNVbQ"; 
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ====== SISTEMA DE AUTENTICAÇÃO ======
class AuthSystem {
    constructor() {
        this.init();
    }

    init() {
        // Se já estiver logado → entra direto
        if (this.isLoggedIn()) {
            this.redirectToApp();
        }

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        // ====== CRIA O USUÁRIO NO SUPABASE ======
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
            setTimeout(() => errorMessage.style.display = "none", 3000);
            return;
        }

        // Salva localmente (igual antes)
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split("@")[0]);

        // Vai pro site
        this.redirectToApp();
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

    logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    }

    redirectToApp() {
        window.location.href = 'index.html';
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Inicializa
const auth = new AuthSystem();
