import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Globe2,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  UtensilsCrossed,
  Users,
  X,
} from 'lucide-react';
import { Router as WouterRouter, Route, Switch, useLocation } from 'wouter';

type Language = 'en' | 'de' | 'ar' | 'tr';
type MenuCategory = 'all' | 'roast' | 'wraps' | 'sides' | 'family';

const queryClient = new QueryClient();

const images = [
  {
    src: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Friends sharing a warm meal around a wooden table',
  },
  {
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Freshly roasted chicken with herbs and vegetables',
  },
  {
    src: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Colorful roasted vegetables on a ceramic plate',
  },
  {
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'A generous family-style dinner spread',
  },
  {
    src: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Crisp fresh salad with greens and citrus',
  },
  {
    src: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Close view of a chef preparing a shared meal',
  },
];

const copy = {
  en: {
    nav: { home: 'Home', about: 'Our table', menu: 'The menu', gallery: 'Gallery', hours: 'Hours', location: 'Find us', contact: 'Contact' },
    heroKicker: 'A neighborhood roast house',
    heroTitle: ['Come hungry.', 'Leave closer.'],
    heroText: 'Slow-roasted chicken, bright wraps, and sides made for passing around. Ember Roast is your table between places.',
    viewMenu: 'Explore the menu',
    findUs: 'Find our table',
    trust: ['Slow-roasted daily', 'Made to be shared', 'A warm welcome, always'],
    aboutKicker: 'The Ember way',
    aboutTitle: 'Good food has a way of making room.',
    aboutText: 'We built Ember Roast around a simple thought: the best meals are generous. They arrive in the middle of the table, ask you to stay a little longer, and leave everyone with a favorite bite.',
    aboutText2: 'Our kitchen keeps things honest — whole chickens roasted low and slow, wraps folded to order, bright herbs, smoky grains, and sides that never feel like an afterthought.',
    aboutButton: 'A little more about us',
    aboutNote: 'Warm food. Open table. No fuss.',
    menuKicker: 'Made today, shared tonight',
    menuTitle: 'A menu with a center of gravity.',
    menuText: 'Choose your comfort: a plate, a wrap, a few sides, or the whole generous spread.',
    categories: { all: 'All plates', roast: 'Roast house', wraps: 'Wraps', sides: 'Sides', family: 'For the table' },
    orderHint: 'Demo menu · prices shown in €',
    featuredKicker: 'The house gathering',
    featuredTitle: 'Family Feast',
    featuredText: 'A whole slow-roasted chicken, two wraps, three generous sides, fresh flatbread, and sauces for the middle of the table.',
    featuredDetail: 'Feeds 3–4 · choose any three sides',
    featuredButton: 'Ask about the feast',
    galleryKicker: 'Around the table',
    galleryTitle: 'There is always room for one more.',
    galleryText: 'A few glimpses of the Ember feeling — bright plates, busy hands, and the good kind of noise.',
    hoursKicker: 'Come as you are',
    hoursTitle: 'We keep the light on.',
    hoursText: 'Drop in for a quick wrap or settle in with everyone. Our demo hours are a starting point for your real opening rhythm.',
    hours: { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday', closed: 'Closed', weekday: '11:30 – 22:00', weekend: '11:30 – 23:00' },
    locationKicker: 'Your neighborhood, for now',
    locationTitle: 'Meet us at the corner.',
    locationText: 'This is a fictional location placeholder for the EMBER ROAST concept. Swap in your real address, map pin, and local details when ready.',
    addressLabel: 'Demo address',
    address: 'Corner of Cedar & Market\nYour city, EU 00000',
    directions: 'Open map directions',
    contactKicker: 'Let’s make a table',
    contactTitle: 'Bring your people.',
    contactText: 'For group meals, private gatherings, or just a note to say hello, send us a message. This form is a presentation demo — no message is sent.',
    name: 'Your name',
    email: 'Email address',
    message: 'Tell us what you have in mind',
    send: 'Send a note',
    sent: 'Your note is ready to go.',
    sentText: 'In a live version, the Ember team would reply here.',
    fictional: 'Fictional contact · no real calls or messages',
    footerLine: 'Roast slowly. Share generously.',
    demo: 'Demo concept — created by MRD',
    lightboxClose: 'Close image',
    lightboxPrev: 'Previous image',
    lightboxNext: 'Next image',
    menuAlt: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    phone: 'Demo line: +00 000 000 000',
    mapPlaceholder: 'Map placeholder / demo',
    galleryView: 'View image',
    heroNote: 'Slow fire · good company',
  },
  de: {
    nav: { home: 'Start', about: 'Unser Tisch', menu: 'Speisekarte', gallery: 'Galerie', hours: 'Öffnungszeiten', location: 'Anfahrt', contact: 'Kontakt' },
    heroKicker: 'Ein Roast House aus der Nachbarschaft',
    heroTitle: ['Komm hungrig.', 'Geh verbundener.'],
    heroText: 'Langsam geröstetes Hähnchen, frische Wraps und Beilagen zum Teilen. Ember Roast ist dein Tisch zwischen zwei Orten.',
    viewMenu: 'Speisekarte ansehen',
    findUs: 'Unseren Tisch finden',
    trust: ['Täglich langsam geröstet', 'Gemacht zum Teilen', 'Immer ein warmer Empfang'],
    aboutKicker: 'Die Ember-Art',
    aboutTitle: 'Gutes Essen schafft Platz.',
    aboutText: 'Ember Roast entstand aus einem einfachen Gedanken: Die besten Mahlzeiten sind großzügig. Sie kommen in die Mitte des Tisches, laden zum Bleiben ein und hinterlassen einen Lieblingsbissen.',
    aboutText2: 'Unsere Küche bleibt ehrlich — ganze Hähnchen, langsam geröstet, Wraps auf Bestellung, frische Kräuter, rauchiges Getreide und Beilagen, die mehr als eine Nebensache sind.',
    aboutButton: 'Mehr über uns',
    aboutNote: 'Warmes Essen. Offener Tisch. Kein Aufwand.',
    menuKicker: 'Heute gemacht, heute geteilt',
    menuTitle: 'Eine Karte mit Mittelpunkt.',
    menuText: 'Wähle deinen Genuss: einen Teller, einen Wrap, ein paar Beilagen oder die ganze großzügige Tafel.',
    categories: { all: 'Alle Teller', roast: 'Roast House', wraps: 'Wraps', sides: 'Beilagen', family: 'Für den Tisch' },
    orderHint: 'Demo-Karte · Preise in €',
    featuredKicker: 'Die Tafelrunde',
    featuredTitle: 'Family Feast',
    featuredText: 'Ein ganzes langsam geröstetes Hähnchen, zwei Wraps, drei großzügige Beilagen, frisches Fladenbrot und Saucen für die Tischmitte.',
    featuredDetail: 'Für 3–4 Personen · drei Beilagen nach Wahl',
    featuredButton: 'Feast anfragen',
    galleryKicker: 'Rund um den Tisch',
    galleryTitle: 'Für einen ist immer noch Platz.',
    galleryText: 'Ein paar Eindrücke vom Ember-Gefühl — helle Teller, beschäftigte Hände und die gute Art von Geräusch.',
    hoursKicker: 'Komm, wie du bist',
    hoursTitle: 'Wir lassen das Licht an.',
    hoursText: 'Komm auf einen schnellen Wrap vorbei oder bleib mit allen. Unsere Demo-Zeiten sind ein Startpunkt für deinen echten Rhythmus.',
    hours: { mon: 'Montag', tue: 'Dienstag', wed: 'Mittwoch', thu: 'Donnerstag', fri: 'Freitag', sat: 'Samstag', sun: 'Sonntag', closed: 'Geschlossen', weekday: '11:30 – 22:00', weekend: '11:30 – 23:00' },
    locationKicker: 'Deine Nachbarschaft, vorerst',
    locationTitle: 'Wir treffen uns an der Ecke.',
    locationText: 'Dies ist ein fiktiver Orts-Platzhalter für das EMBER-ROAST-Konzept. Ersetze ihn später durch deine echte Adresse, Kartenmarkierung und lokale Details.',
    addressLabel: 'Demo-Adresse',
     address: 'Ecke Cedar & Market\nDeine Stadt, EU 00000',
     directions: 'Kartenroute öffnen',
    contactKicker: 'Lass uns einen Tisch machen',
    contactTitle: 'Bring deine Leute mit.',
    contactText: 'Für Gruppenessen, private Runden oder einfach eine Nachricht: Schreib uns. Dieses Formular ist eine Präsentation — es wird nichts gesendet.',
    name: 'Dein Name', email: 'E-Mail-Adresse', message: 'Erzähl uns von deinem Vorhaben', send: 'Nachricht senden', sent: 'Deine Nachricht ist bereit.', sentText: 'In einer Live-Version würde das Ember-Team hier antworten.',
    fictional: 'Fiktiver Kontakt · keine echten Anrufe oder Nachrichten',
    mapPlaceholder: 'Karten-Platzhalter / Demo',
    galleryView: 'Bild ansehen',
    heroNote: 'Langsames Feuer · gute Gesellschaft',
    footerLine: 'Langsam rösten. Großzügig teilen.', demo: 'Demo-Konzept — erstellt von MRD', lightboxClose: 'Bild schließen', lightboxPrev: 'Vorheriges Bild', lightboxNext: 'Nächstes Bild', menuAlt: 'Menü öffnen', closeMenu: 'Menü schließen', language: 'Sprache', phone: 'Demo-Leitung: +00 000 000 000',
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'مائدتنا', menu: 'القائمة', gallery: 'الصور', hours: 'أوقات العمل', location: 'موقعنا', contact: 'تواصل' },
    heroKicker: 'بيت شواء من الحي',
     heroTitle: ['تعال جائعاً.', 'وغادر بقلب أقرب.'],
    heroText: 'دجاج محمّص ببطء، لفائف طازجة وأطباق جانبية وُجدت لتتقاسمها. Ember Roast هو مائدتك بين الأماكن.',
    viewMenu: 'استكشف القائمة', findUs: 'اعثر على مائدتنا',
    trust: ['تحميص بطيء كل يوم', 'أطباق للمشاركة', 'ترحيب دافئ دائماً'],
    aboutKicker: 'طريقة Ember', aboutTitle: 'الطعام الجيد يترك مجالاً للجميع.',
    aboutText: 'بنينا Ember Roast حول فكرة بسيطة: الوجبات الأفضل كريمة. تصل إلى منتصف المائدة، وتدعوك للبقاء قليلاً، وتترك لكل شخص لقمة مفضلة.',
    aboutText2: 'مطبخنا صادق — دجاج كامل محمّص على نار هادئة، لفائف تُحضّر عند الطلب، أعشاب زاهية، حبوب مدخنة وأطباق جانبية لا تأتي كفكرة ثانوية.',
    aboutButton: 'المزيد عنا', aboutNote: 'طعام دافئ. مائدة مفتوحة. بلا تعقيد.',
    menuKicker: 'نحضّره اليوم، ونتشاركه الليلة', menuTitle: 'قائمة لها قلب.',
    menuText: 'اختر ما يريحك: طبق، لفافة، بعض الأطباق الجانبية أو المائدة الكاملة.',
    categories: { all: 'كل الأطباق', roast: 'المحمّصات', wraps: 'اللفائف', sides: 'أطباق جانبية', family: 'للمائدة' },
    orderHint: 'قائمة تجريبية · الأسعار باليورو', featuredKicker: 'جمعة البيت', featuredTitle: 'وليمة العائلة',
    featuredText: 'دجاجة كاملة محمّصة ببطء، لفافتان، ثلاثة أطباق جانبية، خبز طازج وصلصات لمنتصف المائدة.',
    featuredDetail: 'تكفي 3–4 أشخاص · اختر أي ثلاثة أطباق جانبية', featuredButton: 'اسأل عن الوليمة',
    galleryKicker: 'حول المائدة', galleryTitle: 'هناك دائماً مكان لشخص آخر.',
    galleryText: 'لمحات من أجواء Ember — أطباق مشرقة، أيادٍ مشغولة، والضجيج الجميل.',
    hoursKicker: 'تعال كما أنت', hoursTitle: 'نترك الضوء مضاءً.',
    hoursText: 'مرّ لتأخذ لفافة سريعة أو اجلس مع الجميع. أوقاتنا التجريبية بداية لإيقاعك الحقيقي.',
    hours: { mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس', fri: 'الجمعة', sat: 'السبت', sun: 'الأحد', closed: 'مغلق', weekday: '11:30 – 22:00', weekend: '11:30 – 23:00' },
    locationKicker: 'حيّك، في الوقت الحالي', locationTitle: 'نلتقي عند الزاوية.',
    locationText: 'هذا موقع تجريبي خيالي لمفهوم EMBER ROAST. استبدله بعنوانك الحقيقي ودبوس الخريطة والتفاصيل المحلية عند الجاهزية.',
     addressLabel: 'عنوان تجريبي', address: 'زاوية سيدار وماركت\nمدينتك، الاتحاد الأوروبي 00000', directions: 'فتح اتجاهات الخريطة',
    contactKicker: 'لنجهّز مائدة', contactTitle: 'أحضر أحبّتك.',
    contactText: 'لوجبات المجموعات أو اللقاءات الخاصة أو لمجرد إلقاء التحية، أرسل لنا رسالة. هذا النموذج للعرض فقط — لن تُرسل أي رسالة.',
    name: 'اسمك', email: 'البريد الإلكتروني', message: 'أخبرنا بما تفكر فيه', send: 'أرسل رسالة', sent: 'رسالتك جاهزة.', sentText: 'في النسخة الحقيقية، سيرد فريق Ember هنا.',
    fictional: 'جهة اتصال خيالية · لا مكالمات أو رسائل حقيقية', footerLine: 'نحمّص ببطء. نتشارك بسخاء.', demo: 'مفهوم تجريبي — من إنشاء MRD', lightboxClose: 'إغلاق الصورة', lightboxPrev: 'الصورة السابقة', lightboxNext: 'الصورة التالية', menuAlt: 'فتح القائمة', closeMenu: 'إغلاق القائمة', language: 'اللغة', phone: 'خط تجريبي: +00 000 000 000', mapPlaceholder: 'خريطة تجريبية', galleryView: 'عرض الصورة', heroNote: 'نار هادئة · صحبة طيبة',
  },
  tr: {
    nav: { home: 'Ana sayfa', about: 'Soframız', menu: 'Menü', gallery: 'Galeri', hours: 'Çalışma saatleri', location: 'Bizi bulun', contact: 'İletişim' },
    heroKicker: 'Mahalleden bir roast house',
     heroTitle: ['Acık gel.', 'Daha yakın ayrıl.'],
    heroText: 'Yavaşça fırınlanan tavuk, taze dürümler ve paylaşmak için hazırlanan cömert eşlikçiler. Ember Roast, iki yer arasındaki sofran.',
    viewMenu: 'Menüyü keşfet', findUs: 'Soframızı bul',
    trust: ['Her gün yavaş fırınlanır', 'Paylaşmak için hazır', 'Her zaman sıcak karşılama'],
    aboutKicker: 'Ember usulü', aboutTitle: 'İyi yemek herkese yer açar.',
    aboutText: 'Ember Roast’ı basit bir düşünceyle kurduk: En iyi sofralar cömerttir. Yemeği masanın ortasına getirir, biraz daha kalmanı söyler ve herkese sevdiği bir lokma bırakır.',
    aboutText2: 'Mutfağımızın işi dürüst — kısık ateşte bütün tavuklar, sipariş üzerine sarılan dürümler, taze otlar, isli tahıllar ve asla sonradan düşünülmemiş eşlikçiler.',
    aboutButton: 'Hakkımızda biraz daha', aboutNote: 'Sıcak yemek. Açık sofra. Telaş yok.',
    menuKicker: 'Bugün hazır, bu akşam paylaşılır', menuTitle: 'Merkezinde sofra olan menü.',
    menuText: 'İstediğini seç: bir tabak, bir dürüm, birkaç eşlikçi ya da cömertçe kurulmuş bütün sofra.',
    categories: { all: 'Tüm tabaklar', roast: 'Roast house', wraps: 'Dürümler', sides: 'Eşlikçiler', family: 'Sofra için' },
    orderHint: 'Demo menü · fiyatlar €', featuredKicker: 'Evin sofrası', featuredTitle: 'Aile Ziyafeti',
    featuredText: 'Bütün yavaş fırınlanmış tavuk, iki dürüm, üç cömert eşlikçi, taze pide ve masanın ortası için soslar.',
    featuredDetail: '3–4 kişilik · üç eşlikçiyi sen seç', featuredButton: 'Ziyafeti sor',
    galleryKicker: 'Sofranın etrafında', galleryTitle: 'Bir kişi daha için yer vardır.',
    galleryText: 'Ember hissinden birkaç kare — renkli tabaklar, meşgul eller ve güzel türden bir uğultu.',
    hoursKicker: 'Olduğun gibi gel', hoursTitle: 'Işığı açık tutuyoruz.',
    hoursText: 'Hızlı bir dürüm için uğra ya da herkesle otur. Demo saatlerimiz gerçek çalışma ritmin için bir başlangıç.',
    hours: { mon: 'Pazartesi', tue: 'Salı', wed: 'Çarşamba', thu: 'Perşembe', fri: 'Cuma', sat: 'Cumartesi', sun: 'Pazar', closed: 'Kapalı', weekday: '11:30 – 22:00', weekend: '11:30 – 23:00' },
    locationKicker: 'Şimdilik senin mahallende', locationTitle: 'Köşede buluşalım.',
    locationText: 'Bu, EMBER ROAST konsepti için kurgusal bir konum yer tutucusudur. Hazır olduğunda gerçek adresin, harita pinin ve yerel detaylarınla değiştir.',
     addressLabel: 'Demo adres', address: 'Cedar & Market köşesi\nŞehrin, AB 00000', directions: 'Harita yol tarifini aç',
    contactKicker: 'Bir sofra kuralım', contactTitle: 'İnsanlarını getir.',
    contactText: 'Kalabalık yemekler, özel buluşmalar ya da sadece merhaba demek için bize yaz. Bu form sunum demosudur — mesaj gönderilmez.',
    name: 'Adın', email: 'E-posta adresi', message: 'Aklındakini anlat', send: 'Not gönder', sent: 'Notun gönderilmeye hazır.', sentText: 'Canlı versiyonda Ember ekibi buradan cevap verirdi.',
    fictional: 'Kurgusal iletişim · gerçek arama veya mesaj yok', footerLine: 'Yavaş kızart. Cömertçe paylaş.', demo: 'Demo konsepti — MRD tarafından oluşturuldu', lightboxClose: 'Görseli kapat', lightboxPrev: 'Önceki görsel', lightboxNext: 'Sonraki görsel', menuAlt: 'Menüyü aç', closeMenu: 'Menüyü kapat', language: 'Dil', phone: 'Demo hattı: +00 000 000 000', mapPlaceholder: 'Harita yer tutucusu / demo', galleryView: 'Görseli gör', heroNote: 'Yavaş ateş · iyi sohbet',
  },
} as const;

const menuItems = [
  { id: 'ember-plate', category: 'roast' as const, image: images[1].src, price: '18.50', names: { en: 'Ember Roast Plate', de: 'Ember Roast Teller', ar: 'طبق Ember المحمّص', tr: 'Ember Roast Tabağı' }, descriptions: { en: 'Slow-roasted chicken, smoky grains, herbs and pan jus.', de: 'Langsam geröstetes Hähnchen, rauchiges Getreide, Kräuter und Jus.', ar: 'دجاج محمّص ببطء، حبوب مدخنة، أعشاب وصلصة اللحم.', tr: 'Yavaş fırınlanmış tavuk, isli tahıllar, otlar ve sos.' } },
  { id: 'lemon-wrap', category: 'wraps' as const, image: images[0].src, price: '12.80', names: { en: 'Lemon & Herb Wrap', de: 'Zitrone & Kräuter Wrap', ar: 'لفافة الليمون والأعشاب', tr: 'Limonlu ve Otlu Dürüm' }, descriptions: { en: 'Charred chicken, whipped feta, greens and lemon pickle.', de: 'Gegrilltes Hähnchen, Feta-Creme, Grünzeug und Zitronenpickle.', ar: 'دجاج مشوي، فيتا كريمية، خضار ومخلل الليمون.', tr: 'Izgara tavuk, çırpılmış beyaz peynir, yeşillik ve limon turşusu.' } },
  { id: 'fire-wrap', category: 'wraps' as const, image: images[3].src, price: '13.40', names: { en: 'Fire-Roasted Wrap', de: 'Feuer-Roast Wrap', ar: 'لفافة الشواء الناري', tr: 'Ateş Roast Dürüm' }, descriptions: { en: 'Spiced chicken, ember sauce, crunchy cabbage and warm flatbread.', de: 'Würziges Hähnchen, Ember-Sauce, knackiger Kohl und warmes Fladenbrot.', ar: 'دجاج متبّل، صلصة Ember، ملفوف مقرمش وخبز دافئ.', tr: 'Baharatlı tavuk, ember sosu, çıtır lahana ve sıcak pide.' } },
  { id: 'charred-corn', category: 'sides' as const, image: images[2].src, price: '5.20', names: { en: 'Charred Corn & Lime', de: 'Gerösteter Mais & Limette', ar: 'ذرة مشوية ولايم', tr: 'Köz Mısır ve Lime' }, descriptions: { en: 'Sweet corn, lime, chilli butter and toasted seeds.', de: 'Süßer Mais, Limette, Chili-Butter und geröstete Kerne.', ar: 'ذرة حلوة، لايم، زبدة فلفل وبذور محمّصة.', tr: 'Tatlı mısır, lime, acı biberli tereyağı ve kavrulmuş tohumlar.' } },
  { id: 'green-salad', category: 'sides' as const, image: images[4].src, price: '6.40', names: { en: 'Green Market Salad', de: 'Grüner Marktsalat', ar: 'سلطة السوق الخضراء', tr: 'Yeşil Pazar Salatası' }, descriptions: { en: 'Crisp leaves, cucumber, herbs and a sharp house dressing.', de: 'Knackige Blätter, Gurke, Kräuter und kräftiges Hausdressing.', ar: 'أوراق مقرمشة، خيار، أعشاب وتتبيلة البيت المنعشة.', tr: 'Çıtır yapraklar, salatalık, otlar ve keskin ev sosu.' } },
  { id: 'family-feast', category: 'family' as const, image: images[3].src, price: '54.00', names: { en: 'Family Feast', de: 'Family Feast', ar: 'وليمة العائلة', tr: 'Aile Ziyafeti' }, descriptions: { en: 'Whole roast chicken, two wraps, three sides, bread and sauces.', de: 'Ganzes Brathähnchen, zwei Wraps, drei Beilagen, Brot und Saucen.', ar: 'دجاجة كاملة، لفافتان، ثلاثة أطباق، خبز وصلصات.', tr: 'Bütün roast tavuk, iki dürüm, üç eşlikçi, ekmek ve soslar.' } },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={EmberRoastPage} />
        <Route component={() => <EmberRoastPage />} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function EmberRoastPage() {
  const [language, setLanguage] = useState<Language>(() => (sessionStorage.getItem('ember-language') as Language) || 'en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const t = copy[language];
  const demoMapUrl = 'https://www.google.com/maps/search/?api=1&query=Corner+of+Cedar+and+Market%2C+Your+City';
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const visibleMenu = useMemo(() => category === 'all' ? menuItems : menuItems.filter((item) => item.category === category), [category]);
  const navItems = [
    ['home', t.nav.home], ['about', t.nav.about], ['menu', t.nav.menu], ['gallery', t.nav.gallery], ['hours', t.nav.hours], ['location', t.nav.location], ['contact', t.nav.contact],
  ] as const;

  useEffect(() => {
    sessionStorage.setItem('ember-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = `EMBER ROAST — ${t.heroKicker}`;
    const description = document.querySelector('meta[name="description"]') || document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', t.heroText);
    document.head.appendChild(description);
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'EMBER ROAST — ' + t.heroKicker);
    document.head.appendChild(ogTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', t.heroText);
    document.head.appendChild(ogDescription);
    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    document.head.appendChild(ogType);
    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', images[0].src);
    document.head.appendChild(ogImage);
  }, [dir, language, t.heroKicker, t.heroText]);

  useEffect(() => {
    if (selectedImage === null) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
      if (event.key === 'ArrowLeft') setSelectedImage((value) => value === null ? null : (value + images.length - 1) % images.length);
      if (event.key === 'ArrowRight') setSelectedImage((value) => value === null ? null : (value + 1) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedImage]);

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div dir={dir} className="site-shell grain min-h-[100dvh] overflow-x-hidden bg-[#f0ede6] text-[#352a22]">
      <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-[#f0ede6]/20 bg-[#352a22]/95 text-[#f8f5ef] backdrop-blur-md">
        <div className="container-brand flex h-[76px] items-center justify-between gap-5">
          <button type="button" onClick={() => goTo('home')} className="group flex shrink-0 items-center gap-2 text-start" data-testid="button-brand-home" aria-label="EMBER ROAST home">
            <span className="brand-mark grid size-9 place-items-center rounded-full bg-[#e26747] text-[#f8f5ef] transition-transform group-hover:rotate-12"><Flame size={18} strokeWidth={2.4} /></span>
            <span className="font-mono-brand text-[0.78rem] font-medium tracking-[0.2em]">EMBER<br /><span className="text-[#e5af64]">ROAST</span></span>
          </button>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {navItems.map(([id, label]) => <button key={id} type="button" onClick={() => goTo(id)} className="nav-link whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#f8f5ef]/75 transition-colors hover:text-[#f8f5ef]" data-testid={`link-nav-${id}`}>{label}</button>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 text-[0.66rem] font-semibold tracking-[0.12em] md:flex" aria-label={t.language}>
              <Globe2 size={14} className="me-1 text-[#e5af64]" />
              {(['de', 'en', 'ar', 'tr'] as Language[]).map((lang, index) => <span key={lang} className="flex items-center gap-1">{index > 0 && <span className="text-[#f8f5ef]/25">|</span>}<button type="button" onClick={() => setLanguage(lang)} className={`rounded px-1 py-1 transition-colors ${language === lang ? 'text-[#e5af64]' : 'text-[#f8f5ef]/60 hover:text-[#f8f5ef]'}`} aria-pressed={language === lang} data-testid={`button-language-${lang}`}>{lang === 'ar' ? 'العربية' : lang.toUpperCase()}</button></span>)}
            </div>
            <button type="button" onClick={() => goTo('contact')} className="hidden items-center gap-2 rounded-full bg-[#e5af64] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#352a22] transition-colors hover:bg-[#f0c27d] md:flex" data-testid="button-header-contact">{t.nav.contact}<ArrowUpRight size={14} /></button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="grid size-10 place-items-center rounded-full border border-[#f8f5ef]/20 text-[#f8f5ef] xl:hidden" aria-label={mobileOpen ? t.closeMenu : t.menuAlt} aria-expanded={mobileOpen} data-testid="button-mobile-menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {mobileOpen && <div className="mobile-panel border-t border-[#f8f5ef]/10 bg-[#352a22] px-5 pb-6 pt-3 xl:hidden">
          <nav className="container-brand flex flex-col" aria-label="Mobile navigation">
            {navItems.map(([id, label]) => <button key={id} type="button" onClick={() => goTo(id)} className="flex items-center justify-between border-b border-[#f8f5ef]/10 py-3.5 text-start text-sm font-semibold text-[#f8f5ef]/85" data-testid={`link-mobile-nav-${id}`}>{label}<ArrowUpRight size={15} className="text-[#e5af64]" /></button>)}
            <div className="mt-4 flex items-center gap-2 text-xs"><Globe2 size={14} className="text-[#e5af64]" /><span className="me-2 text-[#f8f5ef]/55">{t.language}:</span>{(['de', 'en', 'ar', 'tr'] as Language[]).map((lang) => <button key={lang} type="button" onClick={() => setLanguage(lang)} className={`rounded px-1.5 py-1 ${language === lang ? 'bg-[#e5af64] text-[#352a22]' : 'text-[#f8f5ef]/70'}`} data-testid={`button-mobile-language-${lang}`}>{lang === 'ar' ? 'العربية' : lang.toUpperCase()}</button>)}</div>
          </nav>
        </div>}
      </header>

      <main>
        <section id="home" className="hero-section relative isolate overflow-hidden bg-[#352a22] pt-[76px] text-[#f8f5ef]">
          <img src={images[0].src} alt={images[0].alt} className="hero-image absolute inset-0 -z-20 size-full object-cover object-center opacity-45" />
          <div className="hero-overlay absolute inset-0 -z-10" />
          <div className="hero-inner container-brand relative flex items-end pt-20">
            <div className="hero-content max-w-[740px]">
              <div className="reveal mb-6 flex items-center gap-3 text-[#e5af64]"><span className="h-px w-10 bg-[#e5af64]" /><span className="section-kicker">{t.heroKicker}</span></div>
               <h1 className="hero-title reveal delay-1 max-w-3xl font-display text-[clamp(3.5rem,9vw,8.6rem)] font-semibold leading-[.89] tracking-[-0.055em]" aria-label={t.heroTitle.join(' ')}>{t.heroTitle.map((line, index) => <span key={`${line}-${index}`} className="hero-title-line">{line}</span>)}</h1>
              <p className="reveal delay-2 mt-8 max-w-[470px] text-[1rem] leading-7 text-[#f8f5ef]/75 md:text-[1.1rem]">{t.heroText}</p>
              <div className="hero-actions reveal delay-3 mt-9 flex flex-wrap gap-3">
                <button type="button" onClick={() => goTo('menu')} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e26747] px-5 py-3 text-sm font-bold text-[#f8f5ef] transition-transform hover:-translate-y-0.5 hover:bg-[#ed7a58]" data-testid="button-hero-menu">{t.viewMenu}<ArrowUpRight size={16} /></button>
                <button type="button" onClick={() => goTo('location')} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#f8f5ef]/35 px-5 py-3 text-sm font-bold text-[#f8f5ef] transition-transform hover:-translate-y-0.5 hover:border-[#e5af64] hover:text-[#e5af64]" data-testid="button-hero-location">{t.findUs}<MapPin size={15} /></button>
              </div>
            </div>
            <div className="absolute bottom-10 end-0 hidden max-w-36 text-end md:block"><div className="mb-3 ms-auto grid size-12 place-items-center rounded-full border border-[#f8f5ef]/30"><ArrowDown size={18} /></div><span className="font-mono-brand text-[0.63rem] uppercase leading-4 tracking-[0.16em] text-[#f8f5ef]/50">{t.heroNote}</span></div>
          </div>
        </section>

        <section aria-label="Trust highlights" className="trust-strip bg-[#e5af64] text-[#352a22]">
          <div className="container-brand grid divide-y divide-[#352a22]/15 md:grid-cols-3 md:divide-x md:divide-y-0">
            {t.trust.map((item, index) => <div key={item} className="trust-item flex items-center gap-3 py-4 text-sm font-semibold md:justify-center md:py-5"><span className="font-mono-brand text-xs text-[#9c4a36]">0{index + 1}</span><Check size={15} strokeWidth={2.6} /><span>{item}</span></div>)}
          </div>
        </section>

        <section id="about" className="section-frame scroll-mt-20 bg-[#f0ede6] py-24 md:py-36">
          <div className="container-brand grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-24">
            <div className="relative mx-auto w-full max-w-[480px]">
              <div className="absolute -start-5 -top-5 h-full w-full border border-[#e26747]/45 md:-start-8 md:-top-8" />
              <div className="about-photo relative overflow-hidden bg-[#d9d0c0]"><img src={images[5].src} alt={images[5].alt} className="aspect-[4/5] w-full object-cover grayscale-[15%]" /><div className="absolute bottom-5 start-5 rounded-full bg-[#352a22] px-4 py-2 font-mono-brand text-[0.62rem] uppercase tracking-[0.15em] text-[#f8f5ef]">EMBER / 01</div></div>
            </div>
            <div className="max-w-[620px]">
              <p className="section-kicker mb-5 text-[#bb593e]">{t.aboutKicker}</p>
              <h2 className="font-display text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[.96] tracking-[-0.045em] text-[#352a22]">{t.aboutTitle}</h2>
              <div className="mt-8 grid gap-5 text-[1.02rem] leading-7 text-[#68594e] md:grid-cols-2"><p>{t.aboutText}</p><p>{t.aboutText2}</p></div>
              <div className="mt-10 flex flex-wrap items-center gap-6"><button type="button" onClick={() => goTo('contact')} className="inline-flex items-center gap-2 border-b border-[#bb593e] pb-2 text-sm font-bold text-[#9c4a36] transition-colors hover:text-[#e26747]" data-testid="button-about-contact">{t.aboutButton}<ArrowUpRight size={15} /></button><span className="font-display text-lg italic text-[#9c4a36]">{t.aboutNote}</span></div>
            </div>
          </div>
        </section>

        <section id="menu" className="section-frame scroll-mt-20 bg-[#352a22] py-24 text-[#f8f5ef] md:py-32">
          <div className="container-brand">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="section-kicker mb-5 text-[#e5af64]">{t.menuKicker}</p><h2 className="font-display text-[clamp(2.8rem,6vw,5.9rem)] font-semibold leading-[.94] tracking-[-0.045em]">{t.menuTitle}</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#f8f5ef]/65">{t.menuText}</p></div>
              <span className="font-mono-brand text-[0.63rem] uppercase tracking-[0.12em] text-[#f8f5ef]/45">{t.orderHint}</span>
            </div>
             <div className="menu-tabs mb-9 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={t.nav.menu}>
              {(Object.keys(t.categories) as MenuCategory[]).map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition-colors ${category === item ? 'border-[#e5af64] bg-[#e5af64] text-[#352a22]' : 'border-[#f8f5ef]/20 text-[#f8f5ef]/65 hover:border-[#e5af64] hover:text-[#e5af64]'}`} data-testid={`tab-menu-${item}`}>{t.categories[item]}</button>)}
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleMenu.map((item) => <article key={item.id} className="menu-card group" data-testid={`card-menu-${item.id}`}><div className="menu-card-media relative mb-5 overflow-hidden"><img src={item.image} alt={item.names[language]} className="aspect-[1.32] w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="menu-price absolute end-3 top-3 rounded-full bg-[#f0ede6] px-3 py-1.5 font-mono-brand text-xs font-medium text-[#352a22]">€{item.price}</span></div><div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl font-semibold text-[#f8f5ef]">{item.names[language]}</h3><UtensilsCrossed size={17} className="mt-1 shrink-0 text-[#e5af64]" /></div><p className="mt-2 text-sm leading-6 text-[#f8f5ef]/55">{item.descriptions[language]}</p></article>)}
            </div>
          </div>
        </section>

        <section className="featured-section overflow-hidden bg-[#e26747] text-[#f8f5ef]">
            <div className="container-brand grid gap-0 lg:grid-cols-[1.03fr_.97fr]">
            <div className="flex flex-col justify-center py-20 lg:py-28"><p className="section-kicker mb-5 text-[#f8dfb7]">{t.featuredKicker}</p><h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[.86] tracking-[-0.06em]">{t.featuredTitle}</h2><p className="mt-8 max-w-md text-lg leading-8 text-[#fff4e9]/80">{t.featuredText}</p><p className="mt-5 font-mono-brand text-xs uppercase tracking-[.12em] text-[#f8dfb7]">{t.featuredDetail}</p><button type="button" onClick={() => goTo('contact')} className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#352a22] px-5 py-3 text-sm font-bold text-[#f8f5ef] transition-colors hover:bg-[#49392f]" data-testid="button-featured-contact">{t.featuredButton}<ArrowUpRight size={16} /></button></div>
             <div className="relative min-h-[360px] lg:min-h-0"><img src={images[3].src} alt={menuItems[5].names[language]} className="featured-image absolute inset-0 size-full object-cover mix-blend-multiply opacity-80" /><div className="absolute inset-0 bg-[#e26747]/10" /><div className="absolute bottom-6 start-6 flex items-center gap-2 font-mono-brand text-xs uppercase tracking-[.13em] text-[#fff4e9]"><Users size={15} /> Share it in the middle</div></div>
          </div>
        </section>

        <section id="gallery" className="section-frame scroll-mt-20 bg-[#f0ede6] py-24 md:py-32">
          <div className="container-brand"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker mb-5 text-[#bb593e]">{t.galleryKicker}</p><h2 className="font-display text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[.93] tracking-[-0.05em]">{t.galleryTitle}</h2></div><p className="max-w-sm text-sm leading-6 text-[#68594e]">{t.galleryText}</p></div>
             <div className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">{images.map((image, index) => <button key={image.src} type="button" onClick={() => setSelectedImage(index)} className={`gallery-tile group relative overflow-hidden bg-[#d9d0c0] text-start ${index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`} data-testid={`button-gallery-${index}`} aria-label={`${t.galleryKicker} ${index + 1}`}><img src={image.src} alt={image.alt} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute inset-0 flex items-center justify-center bg-[#352a22]/0 text-[#f8f5ef] transition-colors group-hover:bg-[#352a22]/35"><span className="rounded-full border border-[#f8f5ef]/0 px-3 py-2 text-xs opacity-0 transition-opacity group-hover:border-[#f8f5ef]/70 group-hover:opacity-100">{t.galleryView}</span></span></button>)}</div>
          </div>
        </section>

        <section id="hours" className="section-frame scroll-mt-20 bg-[#d9d0c0] py-24 md:py-32">
          <div className="container-brand grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div><p className="section-kicker mb-5 text-[#bb593e]">{t.hoursKicker}</p><h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-0.05em]">{t.hoursTitle}</h2><p className="mt-7 max-w-md leading-7 text-[#68594e]">{t.hoursText}</p></div>
             <div className="border-t border-[#352a22]/25">{[['mon', 'weekday'], ['tue', 'weekday'], ['wed', 'weekday'], ['thu', 'weekday'], ['fri', 'weekday'], ['sat', 'weekend'], ['sun', 'closed']].map(([day, time]) => <div key={day} className="hours-row flex items-center justify-between border-b border-[#352a22]/20 py-4 text-sm"><span className="font-semibold">{t.hours[day as keyof typeof t.hours]}</span><span className={`font-mono-brand text-xs ${time === 'closed' ? 'text-[#bb593e]' : 'text-[#68594e]'}`}>{t.hours[time as keyof typeof t.hours]}</span></div>)}</div>
          </div>
        </section>

        <section id="location" className="section-frame scroll-mt-20 bg-[#f0ede6] py-24 md:py-32">
          <div className="container-brand grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-24">
             <div className="order-2 lg:order-1"><div className="map-panel relative min-h-[400px] overflow-hidden border border-[#352a22]/10 bg-[#c8bca9]"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(53,42,34,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(53,42,34,.12) 1px, transparent 1px)', backgroundSize: '44px 44px' }} /><div className="absolute inset-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#e26747] bg-[#e26747]/15"><MapPin size={27} className="text-[#9c4a36]" /></div><div className="absolute bottom-5 start-5 rounded bg-[#f0ede6] px-3 py-2 font-mono-brand text-[0.6rem] uppercase tracking-[.12em] text-[#68594e]">{t.mapPlaceholder}</div></div></div>
             <div className="order-1 lg:order-2"><p className="section-kicker mb-5 text-[#bb593e]">{t.locationKicker}</p><h2 className="text-balance font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-0.05em]">{t.locationTitle}</h2><p className="mt-7 max-w-lg leading-7 text-[#68594e]">{t.locationText}</p><div className="mt-9 flex gap-4 border-t border-[#352a22]/15 pt-5"><MapPin className="mt-1 shrink-0 text-[#e26747]" size={19} /><div><p className="font-mono-brand text-[0.63rem] uppercase tracking-[.13em] text-[#9c4a36]">{t.addressLabel}</p><p className="mt-2 whitespace-pre-line font-display text-xl leading-7">{t.address}</p><a href={demoMapUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border-b border-[#bb593e] pb-1.5 text-sm font-bold text-[#9c4a36] transition-colors hover:border-[#e26747] hover:text-[#e26747]">{t.directions}<ArrowUpRight size={15} /></a></div></div></div>
          </div>
        </section>

        <section id="contact" className="section-frame scroll-mt-20 bg-[#352a22] py-24 text-[#f8f5ef] md:py-32">
          <div className="container-brand grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div><p className="section-kicker mb-5 text-[#e5af64]">{t.contactKicker}</p><h2 className="font-display text-[clamp(3rem,6.5vw,6.4rem)] font-semibold leading-[.9] tracking-[-0.055em]">{t.contactTitle}</h2><p className="mt-7 max-w-md leading-7 text-[#f8f5ef]/65">{t.contactText}</p><div className="mt-10 space-y-4 text-sm text-[#f8f5ef]/70"><div className="flex items-center gap-3"><Mail size={17} className="text-[#e5af64]" /><span>hello@ember-roast.demo</span></div><div className="flex items-center gap-3"><Phone size={17} className="text-[#e5af64]" /><span>{t.phone}</span></div></div></div>
             <div>{sent ? <div className="flex min-h-[390px] flex-col items-center justify-center border border-[#f8f5ef]/20 px-7 text-center"><span className="mb-5 grid size-14 place-items-center rounded-full bg-[#e5af64] text-[#352a22]"><Check size={25} /></span><h3 className="font-display text-3xl">{t.sent}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#f8f5ef]/60">{t.sentText}</p><button type="button" onClick={() => setSent(false)} className="mt-7 border-b border-[#e5af64] pb-1 text-sm text-[#e5af64]" data-testid="button-contact-reset">{t.send}</button></div> : <form onSubmit={onSubmit} className="contact-form border border-[#f8f5ef]/20 p-6 md:p-8"><label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#f8f5ef]/60" htmlFor="name">{t.name}</label><input id="name" name="name" required className="contact-field mt-2 mb-6 w-full border-b border-[#f8f5ef]/25 bg-transparent px-0 py-3 text-base text-[#f8f5ef] placeholder:text-[#f8f5ef]/25" placeholder={t.name} data-testid="input-contact-name" /><label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#f8f5ef]/60" htmlFor="email">{t.email}</label><input id="email" name="email" type="email" required className="contact-field mt-2 mb-6 w-full border-b border-[#f8f5ef]/25 bg-transparent px-0 py-3 text-base text-[#f8f5ef] placeholder:text-[#f8f5ef]/25" placeholder={t.email} data-testid="input-contact-email" /><label className="block text-xs font-semibold uppercase tracking-[.1em] text-[#f8f5ef]/60" htmlFor="message">{t.message}</label><textarea id="message" name="message" required rows={3} className="contact-field mt-2 w-full resize-none border-b border-[#f8f5ef]/25 bg-transparent px-0 py-3 text-base text-[#f8f5ef] placeholder:text-[#f8f5ef]/25" placeholder={t.message} data-testid="input-contact-message" /><button type="submit" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e5af64] px-5 py-3 text-sm font-bold text-[#352a22] transition-transform hover:-translate-y-0.5 hover:bg-[#f0c27d]" data-testid="button-contact-submit">{t.send}<Send size={15} /></button><p className="mt-5 font-mono-brand text-[0.62rem] uppercase tracking-[.1em] text-[#f8f5ef]/35">{t.fictional}</p></form>}</div>
          </div>
        </section>
      </main>

      <footer className="bg-[#241b17] py-9 text-[#f8f5ef]">
        <div className="container-brand flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-[#e26747]"><Flame size={15} /></span><span className="font-mono-brand text-xs font-medium tracking-[.18em]">EMBER ROAST</span></div><p className="mt-4 font-display text-xl italic text-[#e5af64]">{t.footerLine}</p></div><div className="flex flex-wrap items-center gap-5 text-xs text-[#f8f5ef]/45"><span>{t.demo}</span><a href="#contact" className="transition-opacity hover:text-[#e5af64]" data-testid="link-footer-contact">{t.nav.contact}</a><a href="#gallery" className="transition-opacity hover:text-[#e5af64]" data-testid="link-footer-gallery"><Instagram size={16} aria-label="Instagram" /></a></div></div>
      </footer>

      {selectedImage !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241b17]/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label={images[selectedImage].alt} onClick={() => setSelectedImage(null)}><button type="button" onClick={() => setSelectedImage(null)} className="absolute end-4 top-4 grid size-11 place-items-center rounded-full border border-[#f8f5ef]/30 text-[#f8f5ef] transition-transform hover:scale-105" aria-label={t.lightboxClose} data-testid="button-lightbox-close"><X size={20} /></button><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage + images.length - 1) % images.length); }} className="absolute start-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#f8f5ef]/30 text-[#f8f5ef] transition-transform hover:scale-105" aria-label={t.lightboxPrev} data-testid="button-lightbox-prev"><ChevronDown className="rotate-90" size={20} /></button><img src={images[selectedImage].src} alt={images[selectedImage].alt} className="lightbox-image max-h-[82vh] max-w-full object-contain" onClick={(event) => event.stopPropagation()} /><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage + 1) % images.length); }} className="absolute end-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#f8f5ef]/30 text-[#f8f5ef] transition-transform hover:scale-105" aria-label={t.lightboxNext} data-testid="button-lightbox-next"><ChevronDown className="-rotate-90" size={20} /></button></div>}
    </div>
  );
}

export default App;