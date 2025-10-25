// Nümunə oyun məlumatları - YENİLƏNİB
const allGames = [
    { title: "The Witcher 3", category: "all", time: "350+ saat", opinion: "Hekayə, qəhrəmanlar və dünya heyrətamizdir."},
    { title: "Cyberpunk 2077", category: "all active", time: "100 saat", opinion: "Gözəl dizayn, hazırda aktiv oynanılır."},
    { title: "Red Dead Redemption 2", category: "all top10 ali-favorites", time: "250 saat", opinion: "Ən sevimli açıq dünya və atmosfer."},
    { title: "Elden Ring", category: "all top10 active", time: "120 saat", opinion: "Çətin, lakin mükafatlandırıcı döyüşlər."},
    { title: "Half-Life 2", category: "all ali-favorites", time: "15 saat", opinion: "Zamansız klassik və fizika mühəndisliyi nümunəsi."},
    { title: "Baldur's Gate 3", category: "all top10 active", time: "80 saat", opinion: "Yeni başlayanlardan, lakin D&D ruhunu tam hiss etdirir."},
    { title: "Mass Effect Legendary Edition", category: "all", time: "180 saat", opinion: "Kosmos operası. Sevdiyim trilogiya."},
    { title: "Portal 2", category: "all top10 ali-favorites", time: "10 saat", opinion: "Əla bulmacalar və yumor."},
    { title: "Doom Eternal", category: "all active", time: "30 saat", opinion: "Sürətli FPS, təkrar oynamağa dəyər."},
    { title: "Horizon Zero Dawn", category: "all", time: "70 saat", opinion: "Robot heyvan ovçuluğu maraqlıdır."},
    { title: "God of War (2018)", category: "all top10", time: "50 saat", opinion: "Ata-oğul hekayəsi və döyüşlər möhtəşəmdir."},
    { title: "StarCraft II", category: "all ali-favorites", time: "Çox illər", opinion: "Ən yaxşı real-time strategiya (RTS) oyunu."},
    { title: "Diablo II: Resurrected", category: "all ali-favorites", time: "100+ saat", opinion: "Köhnə dost, qaranlıq atmosfer."},
];

const navButtons = document.querySelectorAll('.nav-button');
const gameList = document.getElementById('game-list');
// ... (shareSite funksiyası olduğu kimi qalır) ...


// renderGames funksiyası - YENİLƏNİB
function renderGames(category) {
    gameList.innerHTML = ''; 

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
        
        // Yeni cədvəl formatına uyğun HTML strukturu
        gameItem.innerHTML = `
            <span class="game-title">${game.title}</span>
            <span class="game-details">${game.time}</span> 
            <span class="game-opinion">${game.opinion}</span>
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
