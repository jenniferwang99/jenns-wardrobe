import React from 'react';
import styled from 'styled-components';
import { WardrobeItemResponse } from '../services/api';

interface TodaysOutfitProps {
  selectedItems: WardrobeItemResponse[];
  onRemoveItem: (id: number) => void;
}

export const TodaysOutfit: React.FC<TodaysOutfitProps> = ({ selectedItems, onRemoveItem }) => {
  return (
    <Container>
      <Title>today's outfit ✨</Title>
      <OutfitBox>
        {selectedItems.length === 0 ? (
          <EmptyMessage>select items from your wardrobe to create today's outfit!</EmptyMessage>
        ) : (
          <ItemsGrid>
            {selectedItems.map(
              item =>
                item.id && (
                  <OutfitItem key={item.id}>
                    <ItemImage src={item.image_url} alt={item.item_name} />
                    <ItemName>{item.item_name}</ItemName>
                    <RemoveButton onClick={() => onRemoveItem(item.id!)}>×</RemoveButton>
                  </OutfitItem>
                )
            )}
          </ItemsGrid>
        )}
      </OutfitBox>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  padding: 1rem;
`;

const Title = styled.h2`
  color: #9b6b9d;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  text-transform: lowercase;
`;

const OutfitBox = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1rem;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(155, 107, 157, 0.1);
`;

const EmptyMessage = styled.p`
  color: #9b6b9d;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 2rem;
  font-style: italic;
  text-transform: lowercase;
`;

const ItemsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
`;

const OutfitItem = styled.div`
  position: relative;
  background: #faf0f5;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemName = styled.span`
  color: #9b6b9d;
  font-size: 0.9rem;
  flex: 1;
  text-transform: lowercase;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
