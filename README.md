# Proje Yönetim Paneli (Project Management Dashboard)

Bu proje, modern yazılım geliştirme ekiplerinin iş ve üye takibini kolaylaştırmak amacıyla geliştirilmiş dinamik bir frontend uygulamasıdır. 

Eğitim sürecinde edinilen kavramları bütüncül bir şekilde uygulamaya dökmek amacıyla tasarlanan bu projede, bileşen (component) tabanlı mimari ve modern arayüz pratikleri ön planda tutulmuştur.

## Ekran Görüntüsü
![Project Screen][([https://github.com/YoncaEsendemir/ProjectManagement/blob/main/frontend/src/image/ProjectScreen.jpg])

## 🚀 Özellikler

- **Bütüncül CRUD Yönetimi:** Hem ekip üyeleri hem de projeye ait görevler üzerinde Ekleme, Listeleme, Güncelleme ve Silme (CRUD) işlemleri tek bir panel üzerinden kesintisiz yönetilir.
- **Dinamik ve Çoklu Veri Yapısı:** Ekip üyelerine birden fazla rol ve yetenek (skills) atanabilir; bu yetenekler arayüzde dinamik etiketler olarak listelenir.
- **Gelişmiş Durum (State) Takibi:** Görevler; "Yeni Görev", "Süren Görev" ve "Biten Görev" olmak üzere 3 farklı aşamada takip edilir. Her aşama, arayüzde kendine has renk kodlarıyla (Sarı, Mavi, Yeşil) görselleştirilmiştir.
- **Güvenli Yerel Depolama (LocalStorage & CryptoJS):** Uygulamadaki tüm veriler tarayıcı yenilendiğinde kaybolmaması için `LocalStorage` üzerinde saklanır. Veri güvenliği standardı gereği, tarayıcıya yazılan tüm üye ve görev bilgileri **CryptoJS (AES)** algoritması ile şifrelenerek depolanır.
- **Sade, Modern ve Responsive Tasarım:** Arayüz, masaüstü ekranlardan mobil cihazlara kadar tüm çözünürlüklerle %100 uyumlu (responsive) olacak şekilde esnek bir grid yapısında kurgulanmıştır.

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

Uygulamanın geliştirme sürecinde modern web ekosisteminin güçlü araçları tercih edilmiştir:

- **React (JSX):** Bileşen tabanlı (Component-based) uygulama mimarisi ve deklaratif state yönetimi için kullanıldı.
- **Tailwind CSS:** Tasarımın modern, sade ve responsive olmasını sağlamak amacıyla doğrudan HTML etiketleri üzerinden stil yönetiminde kullanıldı.
- **Lucide React:** Arayüzdeki ikon tasarımları ve görsel hiyerarşiyi güçlendirmek amacıyla entegre edildi.
- **Crypto-JS:** Yerel depolamadaki hassas verilerin AES (Advanced Encryption Standard) ile şifrelenmesi amacıyla kullanıldı.

## 📂 Proje Dosya Yapısı

Yönergede belirtilen dosya ağaç yapısına sadık kalınarak oluşturulan mimari şu şekildedir:

```text
src/
├── components/       # Formlar ve Listeler gibi bağımsız bileşenler
│   ├── MemberForm.jsx
│   ├── MemberList.jsx
│   ├── TaskForm.jsx
│   └── TaskList.jsx
├── pages/            # Ana görünüm ve state yönetim katmanı
│   └── Dashboard.jsx
├── App.jsx           # Kök bileşen
└── main.jsx          # Uygulama giriş noktası
