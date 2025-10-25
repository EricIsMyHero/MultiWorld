// Nümunə oyun məlumatları - YENİ OYUNLARINIZ İLƏ
const allGames = [
    { title: "Mobile Legends Bang Bang", category: "all", time: "350+ saat", opinion: "Hekayə, qəhrəmanlar və dünya heyrətamizdir."},
    { title: "Pubg Mobile", category: "all active", time: "100 saat", opinion: "Gözəl dizayn, hazırda aktiv oynanılır."},
    { title: "Minecraft", category: "all top10 ali-favorites", time: "250 saat", opinion: "Ən sevimli açıq dünya və atmosfer."},
    { title: "Valorant Mobile", category: "all top10 active", time: "120 saat", opinion: "Çətin, lakin mükafatlandırıcı döyüşlər."},
    { title: "Clash Of Clans", category: "all ali-favorites", time: "15 saat", opinion: "Zamansız klassik və fizika mühəndisliyi nümunəsidir."},
    { title: "Clash Royale", category: "all top10 active", time: "80 saat", opinion: "Yeni başlayanlardan, lakin D&D ruhunu tam hiss etdirir."},
    { title: "Brawl Stars", category: "all", time: "180 saat", opinion: "Kosmos operası. Sevdiyim trilogiya."},
    { title: "Hay Day", category: "all top10 ali-favorites", time: "10 saat", opinion: "Əla bulmacalar və yumor."},
    { title: "Rise Of Kingsdom", category: "all active", time: "30 saat", opinion: "Sürətli FPS, təkrar oynamağa dəyər."},
    { title: "20 Minutes Till Dawn", category: "all", time: "70 saat", opinion: "Robot heyvan ovçuluğu maraqlıdır."},
    { title: "Among Us", category: "all top10", time: "50 saat", opinion: "Ata-oğul hekayəsi və döyüşlər möhtəşəmdir."},
    { title: "Apex Legends Mobile", category: "all ali-favorites", time: "Çox illər", opinion: "Ən yaxşı real-time strategiya (RTS) oyunu."},
    { title: "Archero 1,2", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Genshin Impact", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "UNO!", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Last Day On Earth: Survival", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Call Of Duty", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Grow Empire", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Grow Castle", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Leauge Of Legends: Wild Rift", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
    { title: "Into Dead 2", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
];

const navButtons = document.querySelectorAll('.nav-button');
const filterButtons = document.querySelectorAll('.filter-button'); // Filtr düymələri
const gameList = document.getElementById('game-list');

// Cari vəziyyəti saxlayan dəyişənlər
let currentCategory = 'all';
let currentSort = 'az';

// Oyunları filtrləyib sıralayan ƏSAS FUNKSİYA
function updateGameList() {
    // 1. Filtrləmə
    let filteredGames = allGames.filter(game => 
        game.category.includes(currentCategory)
    );

    // 2. Sıralama
    filteredGames.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (currentSort === 'az') {
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        } else if (currentSort === 'za') {
            if (titleA > titleB) return -1;
            if (titleA < titleB) return 1;
            return 0;
        }
        return 0;
    });

    renderGames(filteredGames); // Siyahını göstər
}


// Sadəcə siyahını HTML-ə çıxaran funksiya
function renderGames(gamesToRender) {
    gameList.innerHTML = ''; 

    if (gamesToRender.length === 0) {
        gameList.innerHTML = `<p class="placeholder-text">Bu kateqoriyada oyun tapılmadı.</p>`;
        return;
    }

    gamesToRender.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        
        gameItem.innerHTML = `
            <span class="game-title">${game.title}</span>
            <span class="game-details">${game.time}</span> 
            <span class="game-opinion">${game.opinion}</span>
        `;
        gameList.appendChild(gameItem);
    });
}


// Naviqasiya (Kateqoriya) Klik Hadisəsi
function handleNavClick(event) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    currentCategory = event.currentTarget.getAttribute('data-category');
    updateGameList(); // Yeni kateqoriyanı tətbiq et
}

// Sıralama (Filtr) Klik Hadisəsi
function handleSortClick(event) {
    currentSort = event.currentTarget.getAttribute('data-sort');
    updateGameList(); // Yeni sıralamanı tətbiq et
}

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
    // Naviqasiya düymələrinə klik hadisəsini əlavə et
    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });
    
    // Filtr düymələrinə klik hadisəsini əlavə et
    filterButtons.forEach(button => {
        button.addEventListener('click', handleSortClick);
    });

    // Paylaşma düyməsinə klik hadisəsini əlavə et
    const shareButton = document.getElementById('share-button-id');
    if (shareButton) {
        shareButton.addEventListener('click', shareSite);
    }
    
    // Səhifə yüklənərkən ilkin siyahını göstər
    updateGameList();
});
