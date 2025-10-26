// Nümunə oyun məlumatları - YENİ OYUNLARINIZ İLƏ
const allGames = [
    { title: "Mobile Legends Bang Bang", category: "all top10 ali-favourites", time: "9/10", opinion: "Əsəb xəstəsi etsədə yaxşı oyundu. Oynamanızı tövsiyə edirəm."},
    { title: "Pubg Mobile", category: "all ali-favourites", time: "8/10", opinion: "Əvvəl bütün günü oynayırdım(Corona zamanı). İndi güncəlləmələrlə oyunu oynanmaz hala salıblar."},
    { title: "Minecraft", category: "all top10 ali-favorites active", time: "10/10", opinion: "Uşaqlığım bunla keçdi. Deyəcək söz tapa bilmirəm oynayın, oynatdırın."},
    { title: "Valorant Mobile", category: "all active", time: "8/10", opinion: "Birazcıq çətindi. Odakı teldə maksimum bu qədər olur. Ha birdəki hələki Çin dilindədi."},
    { title: "Clash Of Clans", category: "all top10 ali-favorites active", time: "9/10", opinion: "Arada girib oynayıram amma əvvəlki kimi sarmır."},
    { title: "Clash Royale", category: "all top10 ali-favorites active", time: "8/10", opinion: "Eh yəni güncəlləmələrlə biraz yaxşı gedirlərdə hələ mənim istədiyim evrim gəlmir. :/"},
    { title: "Brawl Stars", category: "all active top10 ali-favorites", time: "7/10", opinion: "Oyunu hər nə qədər bəyənsəmdə bir yaxşı güncəlləmə gətirə bilmirlər."},
    { title: "Hay Day", category: "all", time: "8/10", opinion: "Əslində biri üçün yükləmişdim əvvəl, çox oynayırdım. İndi arada girirəm odaki kefim istəyəndə."},
    { title: "Rise Of Kingsdom", category: "all", time: "5/10", opinion: "O vaxtı çox bikarıydım, yükləmişdim"},
    { title: "20 Minutes Till Dawn", category: "all", time: "6/10", opinion: "Əslində yaxşı oyunduda. Mənlik deyil, yəni davamlı oynamaq olmur."},
    { title: "Among Us", category: "all", time: "7/10", opinion: "Mobilə gəlmiş yaxşı oyunlardan biri olmuşdu."},
    { title: "Apex Legends Mobile", category: "all ali-favorites", time: "10/10", opinion: "Bağlanmamışdan əvvəl çox oynayırdım. Heyif bağlandı"},
    { title: "Archero 1,2", category: "all", time: "4/10", opinion: "Əgər bikarsınızsa ola bilər."},
    { title: "Genshin Impact", category: "all", time: "2/10", opinion: "Deyəcək sözüm yoxdu"},
    { title: "UNO!", category: "all ali-favorites", time: "5/10", opinion: "Reklamlar olmasa oynamaq olar."},
    { title: "Last Day On Earth: Survival", category: "all", time: "7/10", opinion: "Gözlədiyim kimi çıxmasada yaxşı oyundu."},
    { title: "Call Of Duty", category: "all", time: "8/10", opinion: "Çox sarmasada əyləncəlidi."},
    { title: "Grow Empire", category: "all", time: "6/10", opinion: "O vaxtı hiyləlisini yükləmişdim. Amma belədə idarə edər."},
    { title: "Grow Castle", category: "all ali-favorites", time: "9/10", opinion: "Əvvəl dəli kimi oynayırdımda indi mənası yoxdu."},
    { title: "Leauge Of Legends: Wild Rift", category: "all", time: "4/10", opinion: "Təzə videolarını gördüm. Bir MLBB qədər etmir."},
    { title: "Into Dead 2", category: "all", time: "6/10", opinion: "Qaçmağı sevirsənsə tam sənlik"},
];

const navButtons = document.querySelectorAll('.nav-button');
const filterButtons = document.querySelectorAll('.filter-button');
const gameList = document.getElementById('game-list');
const searchInput = document.getElementById('search-input'); // Yeni element
const settingsButton = document.getElementById('settings-button');
const settingsMenu = document.getElementById('settings-menu');
const themeButtons = document.querySelectorAll('.theme-button');
const body = document.body; // Mövzunu dəyişmək üçün body-i seçirik

let currentCategory = 'all';
let currentSort = 'az';

// Oyunları filtrləyib sıralayan ƏSAS FUNKSİYA - Axtarış əlavə edildi
function updateGameList() {
    const searchTerm = searchInput.value.toLowerCase(); // Axtarış mətnini al

    // 1. Filtrləmə (Kateqoriya VƏ Axtarışa görə)
    let filteredGames = allGames.filter(game => {
        const categoryMatch = game.category.includes(currentCategory);
        const searchMatch = game.title.toLowerCase().includes(searchTerm); // Oyun adına görə axtar
        return categoryMatch && searchMatch;
    });

    // 2. Sıralama (A-Z / Z-A)
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

    renderGames(filteredGames); 
}

// Parametrlər menyusunu açıb bağlamaq funksiyası
function toggleSettingsMenu() {
    settingsMenu.classList.toggle('settings-menu-hidden');
}

// Mövzu dəyişdirmə funksiyası
function applyTheme(themeName) {
    // Köhnə mövzu siniflərini sil
    body.classList.remove('theme-red-black', 'theme-orange-dark');
    
    // Yalnız default deyilsə, yeni sinifi əlavə et
    if (themeName !== 'default') {
        body.classList.add(`theme-${themeName}`);
    }
    
    // Mövzu adını yerli yaddaşda saxla
    localStorage.setItem('selectedTheme', themeName);
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


// DOM tam yükləndikdən sonra funksiyaları təyin et (YENİLƏNİB)
document.addEventListener('DOMContentLoaded', () => {
    // Yerli yaddaşdan mövzunu yüklə
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    applyTheme(savedTheme);

    // Naviqasiya və Filtr düymələri (olduğu kimi qalır)
    navButtons.forEach(button => button.addEventListener('click', handleNavClick));
    filterButtons.forEach(button => button.addEventListener('click', handleSortClick));
    
    // Axtarış sahəsi (olduğu kimi qalır)
    searchInput.addEventListener('input', updateGameList);

    // Paylaşma düyməsi (olduğu kimi qalır)
    const shareButton = document.getElementById('share-button-id');
    if (shareButton) {
        shareButton.addEventListener('click', shareSite);
    }
    
    // YENİ: Parametrlər düyməsi hadisəsi
    settingsButton.addEventListener('click', toggleSettingsMenu);

    // YENİ: Mövzu düymələri hadisəsi
    themeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const newTheme = event.currentTarget.getAttribute('data-theme');
            applyTheme(newTheme);
            toggleSettingsMenu(); // Seçim edildikdən sonra menyunu bağla
        });
    });

    // Səhifə yüklənərkən ilkin siyahını göstər
    updateGameList();
});
