import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaPlus, 
  FaTrash, 
  FaClock,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isSameDay, addDays } from 'date-fns';


interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  category: 'meeting' | 'task' | 'reminder' | 'event' | 'holiday';
  participants?: string[];
}

const CalendarPage = () => {
  const initialEvents: CalendarEvent[] = [
    { 
      id: '1', 
      title: 'Jamoa majlisi', 
      description: 'Haftalik jamoa majlisi - loyihalar holati va rejalar', 
      start: new Date(new Date().setHours(10, 0, 0, 0)), 
      end: new Date(new Date().setHours(12, 0, 0, 0)), 
      location: 'Asosiy ofis, 3-xona', 
      category: 'meeting' 
    },
    { 
      id: '2', 
      title: 'Mijoz bilan uchrashuv', 
      description: 'Yangi loyiha bo\'yicha mijoz bilan uchrashuv', 
      start: addDays(new Date(new Date().setHours(14, 0, 0, 0)), 1), 
      end: addDays(new Date(new Date().setHours(15, 30, 0, 0)), 1), 
      location: 'Kofe "StarBucks", shahar markazi', 
      category: 'meeting' 
    },
    { 
      id: '3', 
      title: 'Hisobot topshirish', 
      description: 'Oylik moliyaviy hisobotni topshirish', 
      start: addDays(new Date(new Date().setHours(16, 0, 0, 0)), 3), 
      end: addDays(new Date(new Date().setHours(17, 0, 0, 0)), 3), 
      location: 'Boshqaruv departamenti', 
      category: 'task' 
    },
    { 
      id: '4', 
      title: 'Jamoa tashkiliy dam olish kuni', 
      description: 'Yillik jamoa dam olish kuni - barcha xodimlar ishtirok etadi', 
      start: addDays(new Date(new Date().setHours(9, 0, 0, 0)), 10), 
      end: addDays(new Date(new Date().setHours(18, 0, 0, 0)), 10), 
      location: '"Zomin" tog\'li joy', 
      category: 'event' 
    },
    { 
      id: '5', 
      title: 'Mustaqillik kuni', 
      description: 'Davlat bayrami - ofis yopiq', 
      start: addDays(new Date(new Date().setHours(0, 0, 0, 0)), 15), 
      end: addDays(new Date(new Date().setHours(23, 59, 59, 0)), 15), 
      location: '', 
      category: 'holiday' 
    },
    { 
      id: '6', 
      title: 'Server yangilash', 
      description: 'Asosiy serverlarni yangilash va texnik xizmat ko\'rsatish', 
      start: addDays(new Date(new Date().setHours(23, 0, 0, 0)), 2), 
      end: addDays(new Date(new Date().setHours(2, 0, 0, 0)), 3), 
      location: 'Ma\'lumotlar markazi', 
      category: 'task' 
    },
  ];

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'day' | 'week'>('month');
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    location: '',
    category: 'meeting'
  });

  // Oylik ko'rinishdagi kunlarni hisoblash
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Kalendar boshlanish kunini soat 00:00 ga sozlash
  const getDayStart = (date: Date) => {
    return new Date(date.setHours(0, 0, 0, 0));
  };

  // Tanlangan kundagi eventlarni olish
  const getEventsForDate = (date: Date) => {
    const dayStart = getDayStart(date);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    
    return events.filter(event => {
      const eventStart = new Date(event.start);
      return eventStart >= dayStart && eventStart <= dayEnd;
    });
  };

  // Event qo'shish
  const addEvent = () => {
    const event: CalendarEvent = {
      ...newEvent,
      id: `event-${Date.now()}`
    };
    setEvents([...events, event]);
    setIsEventModalOpen(false);
    resetNewEvent();
  };

  // Eventni yangilash
  const updateEvent = () => {
    if (!selectedEvent) return;
    
    setEvents(events.map(event => 
      event.id === selectedEvent.id ? selectedEvent : event
    ));
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  // Eventni o'chirish
  const deleteEvent = () => {
    if (!selectedEvent) return;
    
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  // Yangi eventni boshlang'ich holatiga qaytarish
  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      location: '',
      category: 'meeting'
    });
  };

  // Kategoriya rangini olish
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting': return "bg-blue-100 text-blue-800 border-blue-300";
      case 'task': return "bg-green-100 text-green-800 border-green-300";
      case 'reminder': return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 'event': return "bg-purple-100 text-purple-800 border-purple-300";
      case 'holiday': return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };


  // Oylik ko'rinishdagi kalendar
  const renderMonthView = () => {
    // Hafta kunlari nomlari
    const weekdays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
    
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Kalendar sarlavhasi - oy va yil */}
        <div className="flex items-center justify-between p-4 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Bugun
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        
        {/* Hafta kunlari */}
        <div className="grid grid-cols-7 bg-gray-100 border-b">
          {weekdays.map((day, index) => (
            <div key={index} className="py-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Kalendar kunlari */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {monthDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div 
                key={index}
                className={`min-h-28 bg-white p-2 relative ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${
                  isSelected ? 'bg-blue-50 border-2 border-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedDate(day);
                  if (viewMode === 'day') return;
                }}
              >
                {/* Kun raqami */}
                <div className={`text-right mb-1 ${
                  isToday ? 'font-bold text-blue-600' : ''
                }`}>
                  {format(day, 'd')}
                </div>
                
                {/* Kun eventlari */}
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {dayEvents.slice(0, 3).map(event => (
                    <div 
                      key={event.id}
                      className={`text-xs p-1 rounded truncate cursor-pointer border-l-2 ${getCategoryColor(event.category)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setSelectedDate(new Date(event.start));
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-gray-500">
                        {format(new Date(event.start), 'HH:mm')}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 pl-1">
                      + {dayEvents.length - 3} ta yana
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Kunlik ko'rinish
  const renderDayView = () => {
    if (!selectedDate) return null;
    
    const dayEvents = getEventsForDate(selectedDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">
            {format(selectedDate, 'd MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedDate(addDays(selectedDate, -1))}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Bugun
            </button>
            <button 
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        
        <div className="h-[600px] overflow-y-auto">
          {hours.map(hour => {
            const hourEvents = dayEvents.filter(event => 
              new Date(event.start).getHours() === hour
            );
            
            return (
              <div key={hour} className="flex border-b">
                <div className="w-20 py-4 text-right pr-4 text-gray-500 border-r">
                  {hour}:00
                </div>
                <div className="flex-1 p-2 min-h-16">
                  {hourEvents.map(event => (
                    <div 
                      key={event.id}
                      className={`p-3 mb-2 rounded-lg cursor-pointer ${getCategoryColor(event.category)}`}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEventModalOpen(true);
                      }}
                    >
                      <div className="font-bold">{event.title}</div>
                      <div className="flex items-center text-sm mt-1">
                        <FaClock className="mr-2 text-gray-500" />
                        {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm mt-1">
                          <FaMapMarkerAlt className="mr-2 text-gray-500" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col sm:flex-row min-h-screen bg-gray-50'>
        <div className="container mx-auto px-4 py-8 ">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Sarlavha va statistikalar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaCalendarAlt className="mr-3 text-blue-600" /> Kalendar
            </h1>
            <p className="text-gray-600 mt-2">Hodisalarni rejalashtirish va kuzatish</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">Jami hodisalar</p>
              <p className="text-2xl font-bold text-blue-600">{events.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">Uchrashuvlar</p>
              <p className="text-2xl font-bold text-green-600">{events.filter(e => e.category === 'meeting').length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600">Vazifalar</p>
              <p className="text-2xl font-bold text-purple-600">{events.filter(e => e.category === 'task').length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600">Yaqin hodisalar</p>
              <p className="text-2xl font-bold text-yellow-600">
                {events.filter(e => 
                  new Date(e.start) > new Date() && 
                  new Date(e.start) < addDays(new Date(), 7)
                ).length}
              </p>
            </div>
          </div>
        </div>
        
        {/* Filtrlar va ko'rinish tanlovi */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-gray-50 rounded-xl p-4">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Oylik ko'rinish
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Kunlik ko'rinish
            </button>
          </div>
          
          <button
            onClick={() => {
              if (selectedDate) {
                setNewEvent({
                  ...newEvent,
                  start: selectedDate,
                  end: new Date(selectedDate.setHours(selectedDate.getHours() + 1))
                });
              }
              setIsEventModalOpen(true);
            }}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            <FaPlus className="mr-2" /> Yangi hodisa
          </button>
        </div>
        
        {/* Kalendar asosiy qismi */}
        <div className="mb-8">
          {viewMode === 'month' ? renderMonthView() : renderDayView()}
        </div>
        
        {/* Yaqin keladigan hodisalar */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Yaqin keladigan hodisalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events
              .filter(event => new Date(event.start) > new Date())
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .slice(0, 6)
              .map(event => (
                <div 
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer ${
                    getCategoryColor(event.category)
                  }`}
                  onClick={() => {
                    setSelectedEvent(event);
                    setSelectedDate(new Date(event.start));
                    setViewMode('day');
                  }}
                >
                  <div className="font-bold">{event.title}</div>
                  <div className="flex items-center text-sm mt-2">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {format(new Date(event.start), 'd MMMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <FaClock className="mr-2 text-gray-500" />
                    {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm mt-1">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      {event.location}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Hodisa modali */}
      {isEventModalOpen && (
        <EventModal 
          event={selectedEvent || newEvent}
          isNew={!selectedEvent}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
          onSave={selectedEvent ? updateEvent : addEvent}
          onDelete={() => {
            setIsEventModalOpen(false);
            setIsDeleteModalOpen(true);
          }}
          onChange={(updatedEvent) => {
            if (selectedEvent) {
              setSelectedEvent(updatedEvent as CalendarEvent);
            } else {
              setNewEvent(updatedEvent);
            }
          }}
        />
      )}
      
      {/* O'chirish modali */}
      {isDeleteModalOpen && selectedEvent && (
        <DeleteModal 
          event={selectedEvent}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
          onDelete={deleteEvent}
        />
      )}
    </div>
    </div>
  );
};

// Hodisa modali
const EventModal = ({ 
  event, 
  isNew, 
  onClose, 
  onSave, 
  onDelete,
  onChange
}: { 
  event: CalendarEvent | Omit<CalendarEvent, 'id'>;
  isNew: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onChange: (event: CalendarEvent | Omit<CalendarEvent, 'id'>) => void;
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...event, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl ">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isNew ? "Yangi hodisa qo'shish" : "Hodisani tahrirlash"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sarlavha</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={event.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={event.description}
                onChange={(e) => handleChange('description', e.target.value)}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Boshlanish vaqti</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={format(new Date(event.start), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => handleChange('start', new Date(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tugash vaqti</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={format(new Date(event.end), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => handleChange('end', new Date(e.target.value))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={event.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={event.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <option value="meeting">Uchrashuv</option>
                  <option value="task">Vazifa</option>
                  <option value="reminder">Eslatma</option>
                  <option value="event">Tadbir</option>
                  <option value="holiday">Bayram</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            {!isNew && (
              <button
                onClick={onDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                <FaTrash className="mr-2" /> O'chirish
              </button>
            )}
            
            <div className="flex space-x-3 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {isNew ? "Qo'shish" : "Saqlash"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// O'chirish modali
const DeleteModal = ({ 
  event, 
  onClose, 
  onDelete 
}: { 
  event: CalendarEvent; 
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaTrash className="mr-2 text-red-600" /> Hodisani o'chirish
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800">
              <span className="font-bold">{event.title}</span> hodisasini rostdan ham o'chirmoqchimisiz?
              Bu amalni ortga qaytarib bo'lmaydi.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              Bekor qilish
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;