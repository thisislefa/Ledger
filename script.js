// 1. CONFIGURATION
        // Get your free key at https://newsapi.org/
        const API_KEY = '71b8b91f53b7447b934ae3c1da9d7a84'; 
        const BASE_URL = 'https://newsapi.org/v2';
        const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop';

        // Set Date in Header
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

        // 2. FETCH FUNCTION
        async function fetchNews(category = 'general') {
            try {
                // Fetch Top Headlines for Hero
                const heroResponse = await fetch(`${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
                const heroData = await heroResponse.json();

                // Fetch "Everything" for specific sections to get more volume
                const techResponse = await fetch(`${BASE_URL}/top-headlines?country=us&category=technology&pageSize=3&apiKey=${API_KEY}`);
                const techData = await techResponse.json();

                if(heroData.status === 'error') throw new Error(heroData.message);

                // Render Sections
                renderHero(heroData.articles);
                renderLatest(heroData.articles.slice(4, 8)); // Use articles 4-8 for latest
                renderTech(techData.articles);

            } catch (error) {
                console.error('Error fetching news:', error);
                handleError();
            }
        }

        // 3. RENDER FUNCTIONS

        // Render Hero Section (1 Main + 3 Side)
        function renderHero(articles) {
            const container = document.getElementById('hero-container');
            if(!articles || articles.length < 4) return;

            const mainArt = articles[0];
            const sideArts = articles.slice(1, 4);

            let sideHTML = sideArts.map(art => `
                <article class="side-article">
                    <img src="${art.urlToImage || DEFAULT_IMAGE}" alt="News">
                    <div>
                        <div class="article-meta">
                            <span class="category">${art.source.name}</span>
                        </div>
                        <h3><a href="${art.url}" target="_blank">${art.title}</a></h3>
                    </div>
                </article>
            `).join('');

            container.innerHTML = `
                <article class="main-article">
                    <img src="${mainArt.urlToImage || DEFAULT_IMAGE}" alt="Main News">
                    <div class="article-meta">
                        <span class="category">${mainArt.source.name}</span>
                        <span>${new Date(mainArt.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h2><a href="${mainArt.url}" target="_blank">${mainArt.title}</a></h2>
                    <p class="article-excerpt">${mainArt.description || 'Click to read the full story on the source website.'}</p>
                    <a href="${mainArt.url}" target="_blank" class="read-more">
                        Read More 
                        <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000ff" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4l5.6-5.6Z"/></svg>
                    </a>
                </article>
                <aside class="side-articles">
                    ${sideHTML}
                </aside>
            `;
        }

        // Render Latest News (4 Grid Items)
        function renderLatest(articles) {
            const container = document.getElementById('latest-news-grid');
            if(!articles) return;

            container.innerHTML = articles.map(art => `
                <article class="news-card">
                    <img src="${art.urlToImage || DEFAULT_IMAGE}" alt="News">
                    <div class="article-meta">
                        <span class="category">${art.source.name}</span>
                        <span>${timeAgo(art.publishedAt)}</span>
                    </div>
                    <h3 class="article-title"><a href="${art.url}" target="_blank">${truncate(art.title, 60)}</a></h3>
                </article>
            `).join('');
        }

        // Render Tech Section (3 Grid Items)
        function renderTech(articles) {
            const container = document.getElementById('tech-grid');
            if(!articles) return;

            container.innerHTML = articles.map(art => `
                <article class="tech-card">
                    <img src="${art.urlToImage || DEFAULT_IMAGE}" alt="Tech News">
                    <div class="article-meta">
                        <span class="category">Technology</span>
                        <span>${new Date(art.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 class="article-title"><a href="${art.url}" target="_blank">${truncate(art.title, 50)}</a></h3>
                </article>
            `).join('');
        }

        // Helper: Truncate Text
        function truncate(str, n) {
            return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
        }

        // Helper: Time Ago
        function timeAgo(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);
            if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
            if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
            return Math.floor(seconds / 86400) + "d ago";
        }

        // Error Handler
        function handleError() {
            const warning = `<div class="error-msg">
                <h3>⚠ Content could not be loaded</h3>
                <p>If you are running this file locally, ensure you are using a <strong>Local Server</strong> (like VS Code Live Server). NewsAPI blocks direct file:// access and requires an API Key.</p>
            </div>`;
            document.getElementById('hero-container').innerHTML = warning;
        }

        // Initial Load
        fetchNews();