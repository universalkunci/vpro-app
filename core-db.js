const CoreDB = {
    dbName: "UniversalGroupDB",
    dbVersion: 4, // Naik ke versi 4

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                // Tabel Master Produk
                if (!db.objectStoreNames.contains("master")) {
                    db.createObjectStore("master", { keyPath: "sku" });
                }
                // Tabel Histori Stok (Kartu Stok)
                if (!db.objectStoreNames.contains("stock_history")) {
                    db.createObjectStore("stock_history", { keyPath: "id", autoIncrement: true });
                }
                // Tabel Rekap Penjualan
                if (!db.objectStoreNames.contains("history")) {
                    db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
                }
            };
            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.result);
        });
    }
};