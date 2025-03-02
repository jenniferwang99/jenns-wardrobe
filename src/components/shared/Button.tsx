import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{props.isLoading ? 'loading...' : children}</StyledButton>;
};

// Styling helper functions
const getBackgroundColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return '#ffd1dc';
    case 'secondary':
      return '#f0f0f0';
    case 'icon':
      return '#ffd1dc';
    default:
      return '#ffd1dc';
  }
};

const getHoverBackgroundColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return '#d4a5d6';
    case 'secondary':
      return '#e0e0e0';
    case 'icon':
      return '#d4a5d6';
    default:
      return '#d4a5d6';
  }
};

const getTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'icon':
      return '#9b6b9d';
    default:
      return '#9b6b9d';
  }
};

const getHoverTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
    case 'icon':
      return 'white';
    case 'secondary':
      return '#9b6b9d';
    default:
      return 'white';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.1rem;
      `;
    default: // medium
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
  }
};

const getIconStyles = (variant: ButtonVariant) => {
  if (variant === 'icon') {
    return css`
      border-radius: 50%;
      padding: 0.5rem;
      height: 35px;
      width: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(155, 107, 157, 0.1);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(155, 107, 157, 0.2);
      }
    `;
  }
  return '';
};

// Styled Components
const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: ${props => (props.variant === 'icon' ? '50%' : '25px')};
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;
  background-color: ${props => getBackgroundColor(props.variant || 'primary')};
  color: ${props => getTextColor(props.variant || 'primary')};
  ${props => getSizeStyles(props.size || 'medium')}
  ${props => getIconStyles(props.variant || 'primary')}

  &:hover {
    background-color: ${props => getHoverBackgroundColor(props.variant || 'primary')};
    color: ${props => getHoverTextColor(props.variant || 'primary')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
