// HelpCenterPage.tsx
import React, { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaBook, 
  FaEnvelope, 
  FaPhone, 
  FaCommentDots,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaVideo,
  FaDownload
} from 'react-icons/fa';

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('faq');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  // FAQ kategoriyalari va savollar
  const faqCategories = [
    { id: 'account', name: 'Hisob Sozlamalari' },
    { id: 'billing', name: "To'lov va Hisob-kitob" },
    { id: 'security', name: 'Xavfsizlik' },
    { id: 'features', name: 'Funksiyalar' },
    { id: 'troubleshooting', name: 'Nosozliklarni Bartaraf Etish' },
  ];

  const faqQuestions = [
    {
      id: '1',
      question: 'Hisobimni qanday yangilayman?',
      answer: 'Hisobingizni yangilash uchun "Profil" bo\'limiga o\'ting va "Tahrirlash" tugmasini bosing. Kerakli maydonlarni yangilang va "Saqlash" tugmasini bosing.',
      category: 'account',
      views: 1245
    },
    {
      id: '2',
      question: 'Parolimni unutib qoldim, nima qilishim kerak?',
      answer: 'Agar parolingizni unutgan bo\'lsangiz, kirish oynasida "Parolni unutdingizmi?" havolasini bosing. Elektron pochtangizga parolni tiklash uchun havola yuboriladi.',
      category: 'account',
      views: 876
    },
    {
      id: '3',
      question: "To'lov usullarini qanday qo'shaman?",
      answer: '"To\'lov Usullari" bo\'limiga o\'ting va "Yangi To\'lov Usuli" tugmasini bosing. Karta ma\'lumotlarini kiriting va "Saqlash" tugmasini bosing.',
      category: 'billing',
      views: 654
    },
    {
      id: '4',
      question: 'Ikki qadamli autentifikatsiyani qanday yoqaman?',
      answer: 'Xavfsizlik bo\'limiga o\'ting, "Ikki qadamli autentifikatsiya" bo\'limiga o\'ting va yoqish tugmasini bosing. Telefon raqamingizni tasdiqlang.',
      category: 'security',
      views: 1023
    },
    {
      id: '5',
      question: 'Hisobotlarni qanday yuklab olaman?',
      answer: 'Hisobotlar bo\'limiga o\'ting, kerakli hisobotni tanlang va "Yuklab olish" tugmasini bosing. Hisobot CSV yoki PDF formatida yuklanadi.',
      category: 'features',
      views: 543
    },
    {
      id: '6',
      question: 'Tizimga kira olmayapman, nima qilishim kerak?',
      answer: 'Avval internet aloqasini tekshiring. Agar muammo davom etsa, brauzer keshlarini tozalang yoki boshqa brauzerdan urinib ko\'ring. Agar muammo hal bo\'lmasa, qo\'llab-quvvatlash jamoasiga murojaat qiling.',
      category: 'troubleshooting',
      views: 987
    },
    {
      id: '7',
      question: "To'lovlar qancha vaqtda amalga oshiriladi?",
      answer: "To'lovlar odatda 1-3 ish kunida amalga oshiriladi. Agar to'lovda kechikish bo'lsa, bankingiz bilan bog'laning.",
      category: 'billing',
      views: 765
    },
    {
      id: '8',
      question: 'Ma\'lumotlarim qanchalik xavfsiz?',
      answer: 'Biz sizning ma\'lumotlaringizni shifrlangan holda saqlaymiz va uchinchi shaxslar bilan baham ko\'rmaymiz. Xavfsizlikni ta\'minlash uchun muntazam auditlar o\'tkazamiz.',
      category: 'security',
      views: 1120
    },
  ];

  // Filtirlangan savollar
  const filteredQuestions = activeCategory === 'all' 
    ? faqQuestions 
    : faqQuestions.filter(q => q.category === activeCategory);

  const searchedQuestions = searchTerm 
    ? filteredQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredQuestions;

  const popularQuestions = [...faqQuestions].sort((a, b) => b.views - a.views).slice(0, 4);

  // Savolni kengaytirish
  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  // Ticket yuborish
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert('So\'rovingiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <FaQuestionCircle className="mr-3 text-blue-600" /> Yordam Markazi
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Kerakli javoblarni topishga yordam beramiz. Tez-tez beriladigan savollar yoki qo'llab-quvvatlash jamoasi bilan bog'laning.
        </p>
      </div>

      {/* Tab navigatsiya */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === 'faq' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tez-tez Beriladigan Savollar
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === 'guides' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Qo'llanmalar
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === 'support' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Qo'llab-Quvvatlash
        </button>
      </div>

      {/* FAQ Content */}
      {activeTab === 'faq' && (
        <>
          {/* Qidiruv qismi */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Qanday yordam kerak? Savolingizni yozing..."
                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
            </div>
          </div>

          {/* Mashhur savollar */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mashhur Savollar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularQuestions.map((q) => (
                <div 
                  key={q.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <FaQuestionCircle className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{q.question}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="mr-4">{q.views} ko'rish</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {faqCategories.find(c => c.id === q.category)?.name}
                        </span>
                      </div>
                      <p className="text-blue-600 flex items-center">
                        Javobni ko'rish <FaArrowRight className="ml-2" />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Bo'limi */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* Kategoriyalar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h3 className="font-bold text-gray-800 mb-4">Savollar Kategoriyalari</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeCategory === 'all' 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Barcha Savollar
                    </button>
                  </li>
                  {faqCategories.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeCategory === cat.id 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Savollar ro'yxati */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tez-tez Beriladigan Savollar</h2>
              
              <div className="space-y-4">
                {searchedQuestions.map(q => (
                  <div key={q.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50"
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <span className="font-medium text-gray-800">{q.question}</span>
                      {expandedQuestion === q.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    
                    {expandedQuestion === q.id && (
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                        <p className="text-gray-600">{q.answer}</p>
                        <div className="mt-4 flex items-center">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-4">
                            Bu javob yordam berdi
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 font-medium">
                            Bu javob yordam bermadi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {searchedQuestions.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl shadow-md">
                    <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Hech narsa topilmadi</h3>
                    <p className="text-gray-600">
                      "{searchTerm}" bo'yicha hech qanday natija topilmadi. Boshqa kalit so'zlar bilan urinib ko'ring.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Qo'llanmalar Content */}
      {activeTab === 'guides' && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Foydali Qo'llanmalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-blue-50 flex items-center justify-center">
                <FaBook className="text-blue-500 text-6xl" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-3">
                  Boshlang'ich
                </span>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Admin Panelni Boshlash</h3>
                <p className="text-gray-600 mb-4">
                  Admin paneldan qanday foydalanishni o'rganing. Asosiy funksiyalar va interfeysga oid qo'llanma.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">15 daqiqa • 5 bo'lim</span>
                  <button className="text-blue-600 font-medium flex items-center">
                    O'qish <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-green-50 flex items-center justify-center">
                <FaLightbulb className="text-green-500 text-6xl" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                  O'rta
                </span>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Hisobotlar Yaratish</h3>
                <p className="text-gray-600 mb-4">
                  Turli xil hisobotlarni yaratish, sozlash va eksport qilish bo'yicha batafsil qo'llanma.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">25 daqiqa • 8 bo'lim</span>
                  <button className="text-blue-600 font-medium flex items-center">
                    O'qish <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-purple-50 flex items-center justify-center">
                <FaVideo className="text-purple-500 text-6xl" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mb-3">
                  Video
                </span>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Tizim Integratsiyasi</h3>
                <p className="text-gray-600 mb-4">
                  Admin panelni boshqa tizimlar bilan qanday integratsiya qilish haqida video qo'llanma.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">18 daqiqa • Video</span>
                  <button className="text-blue-600 font-medium flex items-center">
                    Ko'rish <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Admin Panel Foydalanuvchi Qo'llanmasi</h3>
                <p className="text-gray-600 mb-4">
                  Admin panelning barcha funksiyalarini o'rganish uchun to'liq qo'llanma. PDF formatida yuklab oling yoki onlayn o'qing.
                </p>
                <div className="flex space-x-3">
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <FaDownload className="mr-2" /> Yuklab Olish
                  </button>
                  <button className="px-5 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center">
                    <FaBook className="mr-2" /> Onlayn O'qish
                  </button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-48 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-500 font-medium">Foydalanuvchi Qo'llanmasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Qo'llab-quvvatlash Content */}
      {activeTab === 'support' && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Qo'llab-Quvvatlash Kanallari</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaEnvelope className="text-blue-600 text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Email Orqali</h3>
              <p className="text-gray-600 mb-4">
                Elektron pochta orqali savollaringizga javob oling. 24 soat ichida javob beramiz.
              </p>
              <a href="mailto:support@example.com" className="text-blue-600 font-medium">
                support@example.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaPhone className="text-green-600 text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Telefon Orqali</h3>
              <p className="text-gray-600 mb-4">
                Telefon orqali bevosita mutaxassislar bilan bog'lanishingiz mumkin. Ish vaqtida qabul qilamiz.
              </p>
              <a href="tel:+998901234567" className="text-blue-600 font-medium">
                +998 90 123 45 67
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaCommentDots className="text-purple-600 text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Onlayn Chat</h3>
              <p className="text-gray-600 mb-4">
                Onlayn chat orqali tezkor yordam oling. Ish vaqtida 5 daqiqa ichida javob beramiz.
              </p>
              <button className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Chatni Boshlash
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Savol Yuborish</h3>
            <form onSubmit={handleSubmitTicket}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Ismingiz</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Manzilingiz</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Mavzu</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Xabar</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Fayl biriktirish (ixtiyoriy)</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Xabarni Yuborish
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tez-tez So'raladigan Savollar</h3>
            <p className="text-gray-600 mb-6">
              Savolingizga javob topa olmadingizmi? Quyidagi savollar orqali yordam topishingiz mumkin:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularQuestions.slice(0, 4).map(q => (
                <div 
                  key={q.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer"
                  onClick={() => {
                    setActiveTab('faq');
                    setActiveCategory(q.category);
                    setTimeout(() => toggleQuestion(q.id), 100);
                  }}
                >
                  <div className="font-medium text-gray-800">{q.question}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Aloqa ma'lumotlari */}
      <div className="bg-blue-50 rounded-2xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Qo'shimcha Yordam Kerakmi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Email Orqali</h3>
              <p className="text-gray-600">support@example.com</p>
            </div>
            <div>
              <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Telefon Orqali</h3>
              <p className="text-gray-600">+998 90 123 45 67</p>
            </div>
            <div>
              <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCommentDots className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Onlayn Chat</h3>
              <p className="text-gray-600">Ish vaqtida mavjud</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;