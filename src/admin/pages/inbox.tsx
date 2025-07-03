// Inbox.tsx
import React, { useState, useEffect } from 'react';
import { 
  FaInbox, 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaTrash, 
  FaReply, 
  FaArchive, 
  FaFilter, 
  FaSearch, 
  FaUser,
  FaStar,
  FaRegStar
} from 'react-icons/fa';

// Xabar interfeysi
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  archived: boolean;
  starred: boolean;
  category: 'inquiry' | 'complaint' | 'feedback' | 'booking';
}

const Inbox = () => {
  // Dastlabki xabarlar
  const initialMessages: Message[] = [
    { id: '1', name: 'Ali Valiyev', email: 'ali@example.com', subject: 'Ijara haqida', content: 'Salom, mashina ijara haqida ma\'lumot berishingiz mumkinmi?', date: '2025-07-01', read: false, archived: false, starred: true, category: 'inquiry' },
    { id: '2', name: 'Hasan Husanov', email: 'hasan@example.com', subject: 'Shikoyat', content: 'Mashinani yetkazib berishda kechikish bo\'ldi', date: '2025-07-02', read: true, archived: false, starred: false, category: 'complaint' },
    { id: '3', name: 'Lola Karimova', email: 'lola@example.com', subject: 'Taklif', content: 'Sizning servisingiz juda zo\'r, takliflarim bor', date: '2025-07-03', read: false, archived: true, starred: false, category: 'feedback' },
    { id: '4', name: 'Dilshod Rahimov', email: 'dilshod@example.com', subject: 'Mashina band qilish', content: 'Mashinani 10-iyulga band qilmoqchiman', date: '2025-07-03', read: false, archived: false, starred: false, category: 'booking' },
    { id: '5', name: 'Sardor Tursunov', email: 'sardor@example.com', subject: 'Hisob-kitob', content: 'Ijara hisobini yuboring iltimos', date: '2025-07-04', read: true, archived: false, starred: true, category: 'inquiry' },
    { id: '6', name: 'Zarina Ismoilova', email: 'zarina@example.com', subject: 'Mashina holati', content: 'Mashinaning rasmlarini yubora olasizmi?', date: '2025-07-04', read: false, archived: false, starred: false, category: 'inquiry' },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all', // all, unread, read, archived
    category: 'all', // all, inquiry, complaint, feedback, booking
    search: '',
    starred: false,
  });

  // Statistik ma'lumotlar
  const stats = {
    total: messages.length,
    unread: messages.filter(msg => !msg.read).length,
    archived: messages.filter(msg => msg.archived).length,
    starred: messages.filter(msg => msg.starred).length,
  };

  // Filtrlarni qo'llash
  useEffect(() => {
    let result = messages;
    
    // Holat bo'yicha
    if (filters.status !== 'all') {
      if (filters.status === 'unread') {
        result = result.filter(msg => !msg.read);
      } else if (filters.status === 'read') {
        result = result.filter(msg => msg.read);
      } else if (filters.status === 'archived') {
        result = result.filter(msg => msg.archived);
      }
    }
    
    // Kategoriya bo'yicha
    if (filters.category !== 'all') {
      result = result.filter(msg => msg.category === filters.category);
    }
    
    // Yulduzchali xabarlar
    if (filters.starred) {
      result = result.filter(msg => msg.starred);
    }
    
    // Qidiruv bo'yicha
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(msg => 
        msg.name.toLowerCase().includes(term) || 
        msg.email.toLowerCase().includes(term) ||
        msg.subject.toLowerCase().includes(term) ||
        msg.content.toLowerCase().includes(term)
      );
    }
    
    setFilteredMessages(result);
  }, [filters, messages]);

  // Xabarni ochib o'qish
  const openMessage = (msg: Message) => {
    setSelectedMessage(msg);
    setIsDetailOpen(true);
    
    // Agar o'qilmagan bo'lsa, o'qilgan qilamiz
    if (!msg.read) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  // Xabarni o'chirish
  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    setSelectedMessage(null);
    setIsDetailOpen(false);
  };

  // Xabarni arxivlash/arxivdan chiqarish
  const toggleArchive = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, archived: !msg.archived } : msg
    ));
  };

  // Xabarga yulduzcha qo'yish
  const toggleStar = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  // Barcha xabarlarni o'qilgan deb belgilash
  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
  };

  // Filtrlarni tozalash
  const clearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      search: '',
      starred: false,
    });
  };

  // Kategoriya nomini olish
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'inquiry': return "So'rov";
      case 'complaint': return "Shikoyat";
      case 'feedback': return "Fikr-mulohaza";
      case 'booking': return "Band qilish";
      default: return category;
    }
  };

  // Kategoriya rangini olish
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inquiry': return "bg-blue-100 text-blue-800";
      case 'complaint': return "bg-red-100 text-red-800";
      case 'feedback': return "bg-green-100 text-green-800";
      case 'booking': return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Sarlavha va statistikalar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaInbox className="mr-3 text-blue-600" /> Xabarlar qutisi
            </h1>
            <p className="text-gray-600 mt-2">Barcha kelgan xabarlar</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">Jami xabarlar</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">O'qilmagan</p>
              <p className="text-2xl font-bold text-green-600">{stats.unread}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600">Arxivlangan</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.archived}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600">Yulduzchali</p>
              <p className="text-2xl font-bold text-purple-600">{stats.starred}</p>
            </div>
          </div>
        </div>
        
        {/* Filtrlar va qidiruv */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaFilter className="mr-2 text-blue-500" /> Filtrlash va qidiruv
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Qidiruv</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ism, email, mavzu, matn..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holati</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">Barcha xabarlar</option>
                <option value="unread">O'qilmagan</option>
                <option value="read">O'qilgan</option>
                <option value="archived">Arxivlangan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="all">Barcha kategoriyalar</option>
                <option value="inquiry">So'rov</option>
                <option value="complaint">Shikoyat</option>
                <option value="feedback">Fikr-mulohaza</option>
                <option value="booking">Band qilish</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  id="starred-filter"
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={filters.starred}
                  onChange={(e) => setFilters({...filters, starred: e.target.checked})}
                />
                <label htmlFor="starred-filter" className="ml-2 text-sm text-gray-700">
                  Faqat yulduzchali
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              <FaEnvelopeOpen className="mr-2" /> Hammasini o'qilgan deb belgilash
            </button>
            
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Filtrlarni tozalash
            </button>
          </div>
        </div>
        
        {/* Jadval ustidagi amallar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Xabarlar ro'yxati <span className="text-blue-600">({filteredMessages.length})</span>
          </h2>
        </div>
        
        {/* Xabarlar ro'yxati */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <FaEnvelope className="mx-auto text-gray-400 text-4xl mb-4" />
                <div className="text-gray-500 text-lg">Xabarlar topilmadi</div>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ${
                    !message.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => openMessage(message)}
                >
                  <div className="flex items-start">
                    {/* Xabar holati ikonkasi */}
                    <div className="mr-3 mt-1">
                      {!message.read ? (
                        <FaEnvelope className="text-blue-500" />
                      ) : (
                        <FaEnvelopeOpen className="text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`${!message.read ? 'font-bold' : ''} text-gray-900 truncate`}>
                            {message.name}
                          </span>
                          {message.starred && (
                            <FaStar className="ml-2 text-yellow-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {message.date}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium truncate ${!message.read ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                            {message.subject}
                          </p>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {message.content.substring(0, 70)}...
                          </p>
                        </div>
                        
                        <div className="flex space-x-2 ml-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(message.category)}`}>
                            {getCategoryName(message.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(message.id);
                        }}
                        className="p-2 text-gray-400 hover:text-yellow-500"
                      >
                        {message.starred ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          <FaRegStar />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleArchive(message.id);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-500 ml-1"
                      >
                        <FaArchive />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Xabar tafsilotlari modali */}
      {isDetailOpen && selectedMessage && (
        <MessageDetail 
          message={selectedMessage} 
          onClose={() => setIsDetailOpen(false)} 
          onDelete={deleteMessage}
          onArchive={toggleArchive}
          onStar={toggleStar}
        />
      )}
    </div>
  );
};

// Xabar tafsilotlari komponenti
const MessageDetail = ({ 
  message, 
  onClose, 
  onDelete,
  onArchive,
  onStar
}: { 
  message: Message; 
  onClose: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onStar: (id: string) => void;
}) => {
  const [replyText, setReplyText] = useState('');
  
  const handleSendReply = () => {
    // Bu yerda javob yuborish logikasi bo'ladi
    alert('Javob yuborildi!');
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-gray-800">{message.subject}</h2>
                <button
                  onClick={() => onStar(message.id)}
                  className="ml-3 text-gray-400 hover:text-yellow-500"
                >
                  {message.starred ? (
                    <FaStar className="text-yellow-500 text-xl" />
                  ) : (
                    <FaRegStar className="text-xl" />
                  )}
                </button>
              </div>
              <div className="mt-1 text-gray-600 flex items-center">
                <FaUser className="mr-2" />
                <span className="font-medium">{message.name}</span> &lt;{message.email}&gt;
              </div>
              <div className="mt-1 text-sm text-gray-500">{message.date}</div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Javob yozish</h3>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Xabaringizni yozing..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            
            <div className="mt-4 flex justify-between">
              <div className="flex space-x-3">
                <button
                  onClick={() => onArchive(message.id)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  <FaArchive className="mr-2" />
                  {message.archived ? "Arxivdan chiqarish" : "Arxivlash"}
                </button>
                <button
                  onClick={() => onDelete(message.id)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  <FaTrash className="mr-2" /> O'chirish
                </button>
              </div>
              <button
                onClick={handleSendReply}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={!replyText.trim()}
              >
                <FaReply className="mr-2" /> Javobni yuborish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;