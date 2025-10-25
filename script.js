// Nümunə oyun məlumatları
const allGames = [
    { title: "The Witcher 3", category: "all", details: "350 saat oynanıb" },
    { title: "Cyberpunk 2077", category: "all active", details: "Hazırda oynanılır" },
    { title: "Red Dead Redemption 2", category: "all top10 ali-favorites", details: "Ən sevimli oyun" },
    { title: "Elden Ring", category: "all top10 active", details: "Çətin, lakin maraqlı" },
    { title: "Half-Life 2", category: "all ali-favorites", details: "Klassik" },
    { title: "Baldur's Gate 3", category: "all top10 active", details: "Yeni başlayanlardan" },
    { title: "Mass Effect Legendary Edition", category: "all", details: "Trilogiya" },
    { title: "Portal 2", category: "all top10 ali-favorites", details: "Əla Bulmacalar" },
    { title: "Doom Eternal", category: "all active", details: "Sürətli FPS" },
    { title: "Horizon Zero Dawn", category: "all", details: "Açıq dünya" },
    // Yalnız Top 10 üçün
    { title: "God of War (2018)", category: "all top10", details: "Epik səyahət" },
    // Yalnız Əlinin Vazgeçilməzləri üçün
    { title: "StarCraft II", category: "all ali-favorites", details: "Ən yaxşı RTS" },
    { title: "Diablo II: Resurrected", category: "all ali-favorites", details: "Köhnə dost" },
];

const navButtons = document.querySelectorAll('.nav-button');
const gameList = document.getElementById('game-list');

function renderGames(category) {
    gameList.innerHTML = ''; // Siyahını təmizlə

    const filteredGames = allGames.filter(game => 
        game.category.includes(category)
    );

    if (filteredGames.length === 0) {
        gameList.innerHTML = `<p class="placeholder-text">Bu kateqoriyada oyun tapılmadı.</p>`;
        return;
    }

    filteredGames.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `
            <span class="game-title">${game.title}</span>
            <span class="game-details">${game.details}</span>
        `;
        gameList.appendChild(gameItem);
    });
}

function handleNavClick(event) {
    // Bütün düymələrdən 'active' sinfini sil
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Kliklənən düyməyə 'active' sinfini əlavə et
    event.currentTarget.classList.add('active');

    const category = event.currentTarget.getAttribute('data-category');
    renderGames(category);
}

// Naviqasiya düymələrinə klik hadisəsini əlavə et
navButtons.forEach(button => {
    button.addEventListener('click', handleNavClick);
});

// Səhifə yüklənərkən ilkin (Ümumi Oyunlar) siyahısını göstər
document.addEventListener('DOMContentLoaded', () => {
    renderGames('all');
});

// Paylaşma funksiyası
function shareSite() {
    const shareData = {
        title: "my-games",
        text: "Əlinin oynadığı bütün oyunların siyahısı burada.",
        url: window.location.href
    };
    if (navigator.share) {
        navigator.share(shareData).catch(err => console.error("Paylaşmaq mümkün olmadı:", err));
    } else {
        alert("Paylaşma funksiyası bu cihazda dəstəklənmir.");
    }
}

// DOM tam yükləndikdən sonra funksiyaları təyin et
document.addEventListener('DOMContentLoaded', () => {
    // 1. Naviqasiya düymələrinə klik hadisəsini əlavə et
    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });

    // 2. Paylaşma düyməsinə klik hadisəsini əlavə et
    const shareButton = document.getElementById('share-button-id');
    if (shareButton) {
        shareButton.addEventListener('click', shareSite);
    }
    
    // 3. Səhifə yüklənərkən ilkin siyahını göstər
    renderGames('all');
});
