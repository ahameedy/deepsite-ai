class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #0F1724;
                    border-top: 1px solid #334155;
                    padding: 1.5rem 2rem;
                    margin-top: 2rem;
                }
                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .footer-links {
                    display: flex;
                    gap: 1.5rem;
                }
                .footer-link {
                    color: #94A3B8;
                    text-decoration: none;
                    font-size: 0.875rem;
                }
                .footer-link:hover {
                    color: white;
                }
                .copyright {
                    color: #64748B;
                    font-size: 0.875rem;
                }
                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                    .footer-links {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }
            </style>
            <footer>
                <div class="footer-content">
                    <div class="copyright">
                        &copy; ${new Date().getFullYear()} Utopia Scanner Pro
</div>
                    <div class="footer-links">
                        <a href="/terms" class="footer-link">Terms</a>
                        <a href="/privacy" class="footer-link">Privacy</a>
                        <a href="/contact" class="footer-link">Contact</a>
                        <a href="/api" class="footer-link">API</a>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('custom-footer', CustomFooter);