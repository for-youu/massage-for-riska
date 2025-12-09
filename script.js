document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    // 🔊 BACKSOUND SETUP ------------------------
    const backsound = document.getElementById("backsound");
    let musicStarted = false;
    // ------------------------------------------

    /**
     * Menampilkan slide berdasarkan indeks.
     * Mengatur kelas 'active' dan memperbarui tombol navigasi.
     * @param {number} index - Indeks slide yang akan ditampilkan.
     */
    function showSlide(index) {
        // Hapus kelas 'active' dari semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
            // Hapus animasi agar tidak berulang saat kembali
            slide.querySelectorAll('.fade-in-up').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // force reflow
            });
        });

        // Tambahkan kelas 'active' ke slide saat ini
        slides[index].classList.add('active');

        // Aktifkan kembali animasi pada slide yang baru
        slides[index].querySelectorAll('.fade-in-up').forEach(el => {
            const delay = el.classList.contains('delay-1') ? '0.3s' : '0s';
            el.style.animation = `fadeInUp 0.8s ease-out ${delay} forwards`;
        });

        // Perbarui status tombol
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
    }

    /**
     * Pindah ke slide berikutnya.
     */
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }

    /**
     * Pindah ke slide sebelumnya.
     */
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    // 🔊 Mulai backsound saat tombol "Lanjut" pertama kali dipencet
    nextBtn.addEventListener('click', () => {
        if (!musicStarted) {
            backsound.play();
            musicStarted = true;
        }
        nextSlide();
    });

    // Tombol kembali tetap normal
    prevBtn.addEventListener('click', prevSlide);

    // Tampilkan slide pertama saat halaman dimuat
    showSlide(currentSlide);
});

// generate icon
const bg = document.getElementById("bg-animation");

const icons = ["⭐", "❤️", "✨", "🌙", "💫", "🪽", "🌟"];

for (let i = 0; i < 35; i++) {
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.innerText = icons[Math.floor(Math.random() * icons.length)];

    // posisi random
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.bottom = "-50px";

    // durasi random
    icon.style.animationDuration = (4 + Math.random() * 6) + "s";

    bg.appendChild(icon);
}