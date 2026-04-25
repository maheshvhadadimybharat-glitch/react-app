import React from "react";

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'md' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ label, 
  variant = 'primary', size = 'md', onClick, type = 'button', disabled = false }: ButtonProps) => {
  const getStyles = (): React.CSSProperties => {
    return {
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: 'none',
      fontWeight: 'bold',
      margin: '5px',
      backgroundColor: variant === 'primary' ? '#007bff' : variant === 'outline' ? 'transparent' : '#6c757d',
      color: variant === 'outline' ? '#007bff' : 'white',
      border: variant === 'outline' ? '1px solid #007bff' : 'none',
      opacity: disabled ? 0.6 : 1,
      fontSize: size === 'small' ? '12px' : size === 'large' ? '18px' : '14px',
    };
  };

  return (
    <button style={getStyles()} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;