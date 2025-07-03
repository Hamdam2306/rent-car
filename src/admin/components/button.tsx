const Button = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode; variant?: 'primary' | 'link' | 'second'; className?: string }) => {
    const base = 'px-4 py-2 rounded text-sm';
    const variants = {  
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      second: 'bg-white text-gray-600 hover:bg-gray',
      link: 'text-blue-600 hover:underline',
    };
    return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
  };

  export default Button