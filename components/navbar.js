class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: #0F1724;
                }
.nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                }
                .logo {
                    font-weight: bold;
                    font-size: 1.25rem;
                    color: white;
                }
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                .nav-link {
                    color: #94A3B8;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: white;
                }
                .theme-toggle {
                    background: none;
                    border: none;
                    color: #94A3B8;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .nav-container {
                        padding: 1rem;
                    }
                    .nav-links {
                        gap: 1rem;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo no-underline">Utopia Scanner Pro</a>
<div class="nav-links">
                        <a href="/" class="nav-link">Dashboard</a>
                        <a href="/all-stocks" class="nav-link">All Stocks</a>
                        <a href="/news" class="nav-link">News</a>
                        <a href="/watchlist" class="nav-link">Watchlist</a>
                        <a href="/alerts" class="nav-link">Alerts</a>
<button class="theme-toggle" id="themeToggle">
                            <i data-feather="moon"></i>
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('custom-navbar', CustomNavbar);