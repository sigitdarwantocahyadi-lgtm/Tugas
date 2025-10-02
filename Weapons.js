let saldo = 0;
let senjata = {
    kosong: {nama: "Tangan Kosong", damage: 1, ketahanan: 1, level: 1, bisaUpgrade: false},
    Sword: {nama: "Sword", damage: 10, ketahanan: 5, level: 1, bisaUpgrade: true},
    bow: {nama: "Bow", damage: 8, ketahanan: 3, level: 1, bisaUpgrade: true}
};
let senjataAktif = "kosong"; // default awal: tangan kosong

// Update saldo di UI
function updateSaldo() {
    document.getElementById('saldo').textContent = `Saldo: Rp${saldo}`;
}

// Pilih senjata
function pilihSenjata() {
    const pilihan = prompt("Pilih senjata:\n1. Sword\n2. Bow");
    if (pilihan === "1") {
        senjataAktif = "Sword";
        alert("Senjata aktif: Sword ⚔️");
    } else if (pilihan === "2") {
        senjataAktif = "bow";
        alert("Senjata aktif: Bow 🏹");
    } else {
        alert("Pilihan tidak valid!");
    }
}

// Latihan lawan puppet → dapat coin
function latihan() {
    const reward = Math.floor(Math.random() * 2000) + 500; // 500 - 2500 coin
    saldo += reward;
    updateSaldo();
    alert(`Kamu latihan menyerang puppet dan dapat Rp${reward} coin!`);
}

// Upgrade senjata (pilih damage / ketahanan)
function upgradeSenjata() {
    let aktif = senjata[senjataAktif];

    if (!aktif.bisaUpgrade) {
        alert(`Senjata ${aktif.nama} tidak bisa di-upgrade! Silakan pilih senjata lain.`);
        return;
    }

    let biaya = aktif.level * 3000; // biaya upgrade naik tiap level
    if (saldo < biaya) {
        alert(`Saldo tidak cukup! Butuh Rp${biaya} untuk upgrade.`);
        return;
    }

    if (aktif.level >= 5) {
        alert(`${aktif.nama} sudah mencapai level maksimal (5). Tidak bisa di-upgrade lagi.`);
        return;
    }

    const pilihan = prompt(`Upgrade apa?\n1. Damage (+5)\n2. Ketahanan (+3)\nBiaya: Rp${biaya}`);
    if (pilihan === "1") {
        aktif.damage += 5;
        saldo -= biaya;
        aktif.level++;
        alert(`${aktif.nama} berhasil di-upgrade! Damage sekarang ${aktif.damage}`);
    } else if (pilihan === "2") {
        aktif.ketahanan += 3;
        saldo -= biaya;
        aktif.level++;
        alert(`${aktif.nama} berhasil di-upgrade! Ketahanan sekarang ${aktif.ketahanan}`);
    } else {
        alert("Pilihan tidak valid!");
        return;
    }
    updateSaldo();
}

// Lihat status senjata
function lihatSenjata() {
    let aktif = senjata[senjataAktif];
    alert(`Senjata: ${aktif.nama}\nLevel: ${aktif.level}\nDamage: ${aktif.damage}\nKetahanan: ${aktif.ketahanan}`);
}

// Render UI
document.body.innerHTML = `
    <h2>Grow weapons</h2>
    <div id="saldo">Saldo: Rp0</div>
    <button onclick="pilihSenjata()">Pilih Senjata</button>
    <button onclick="latihan()">Latihan (Dapat Coin)</button>
    <button onclick="upgradeSenjata()">Upgrade Senjata</button>
    <button onclick="lihatSenjata()">Lihat Status Senjata</button>
`;

updateSaldo();
