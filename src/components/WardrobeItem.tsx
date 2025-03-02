import React from 'react';
import styled from 'styled-components';
import { WardrobeItemResponse } from '../services/api';
import { Button } from './shared/Button';
import { EditItemModal } from './EditItemModal';

interface WardrobeItemProps {
  item: WardrobeItemResponse;
  onWear: (id: number) => void;
  onEdit: (id: number, name: string, category: string) => Promise<void>;
  onSelect: (item: WardrobeItemResponse) => void;
  isSelected?: boolean;
}

export const WardrobeItem: React.FC<WardrobeItemProps> = ({
  item,
  onWear,
  onEdit,
  onSelect,
  isSelected,
}) => {
  if (!item.id) return null;

  return (
    <ItemCard>
      <ItemImage src={item.image_url} alt={item.item_name} />
      <ItemDetails>
        <ItemHeader>
          <ItemName>{item.item_name}</ItemName>
          <ButtonGroup>
            <EditItemModal item={item} onEdit={onEdit} />
            <SelectButton onClick={() => onSelect(item)} isSelected={isSelected}>
              {isSelected ? '✓' : '+'}
            </SelectButton>
          </ButtonGroup>
        </ItemHeader>
        <TimesWorn>worn {item.times_worn} times</TimesWorn>
        <Button variant="primary" size="small" onClick={() => onWear(item.id!)}>
          i wore this today ✨
        </Button>
      </ItemDetails>
    </ItemCard>
  );
};

// Styled Components
const ItemCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 0.75rem;
  box-shadow: 0 4px 6px rgba(155, 107, 157, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(155, 107, 157, 0.2);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ItemName = styled.h3`
  margin: 0;
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  text-transform: lowercase;
`;

const TimesWorn = styled.span`
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  text-transform: lowercase;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SelectButton = styled.button<{ isSelected?: boolean }>`
  background: ${props => (props.isSelected ? '#9b6b9d' : '#ffd1dc')};
  color: ${props => (props.isSelected ? 'white' : '#9b6b9d')};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => (props.isSelected ? '#885c8a' : '#ffbbc9')};
    transform: scale(1.05);
  }
`;
