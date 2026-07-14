export const siteConfig = {
  artist: {
    name: 'Sanatçı Adı',
    shortName: 'Sanatçı',
    title: 'Ebru Sanatçısı',
    tagline: 'Suyun yüzünde dans eden renkler',
    bio: 'Geleneksel Türk ebru sanatçısı. Yıllar süren practise ve ustalığın ardından, suyun yüzeyinde renklerle dans eden eşsiz eserler ortaya koyuyor. Atölyesinde hem kendi sanatını üretiyor hem de ebru sanatını yeni nesillere aktarıyor.',
    fullBio: [
      'Ebru sanatına olan yolculuğum yıllar önce, suyun yüzeyindeki renklerin büyüsüne tanık olduğum bir gün başladı. O ilk anki hayranlık, bugün hâlâ her yeni çalışmamda yeniden uyanıyor.',
      'Geleneksel teknikleri öğrenmek için dönemin ustalarıyla çalıştım. Battal, şal, tarz-ı kadim, neyyş — her bir ebru türünün kendine özgü bir dili, bir ritmi var. Bu dili konuşmayı öğrenmek, yıllar süren sabır ve deneyim gerektirdi.',
      'Bugün atölyemde hem kendi eserlerimi üretiyor hem de ebruya merak salanlara bu sanatı öğretiyorum. Ebru, sadece bir teknik değil; suyla, renkle ve zamanla kurulan sessiz bir diyalog. Amacım bu diyaloğu her geçen gün daha derinlemesine sürdürmek.',
    ],
    email: 'info@ebruatolyesi.com',
    phone: '+90 555 000 00 00',
    address: 'Atölye Mahallesi, Sanat Sokak No:1, İstanbul',
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=28.8%2C41.0%2C29.0%2C41.1&layer=mapnik',
    mapLink: 'https://www.openstreetmap.org/?mlat=41.05&mlon=28.85#map=14/41.05/28.85',
  },
  social: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    pinterest: 'https://pinterest.com',
  },
}

export const navItems = [
  { label: 'Anasayfa', path: '/' },
  { label: 'Sanatçı', path: '/sanatci' },
  { label: 'Eserler', path: '/eserler' },
  { label: 'Etkinlikler', path: '/etkinlikler' },
  { label: 'Atölye', path: '/atolye' },
  { label: 'İletişim', path: '/iletisim' },
] as const
