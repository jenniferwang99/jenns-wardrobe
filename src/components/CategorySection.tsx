import React from 'react';
import styled from 'styled-components';
import { WardrobeItemResponse } from '../services/api';
import { Category } from '../types';
import { WardrobeItem } from './WardrobeItem';

interface Props {
  category: Category;
  items: WardrobeItemResponse[];
  onWear: (id: number) => void;
  onEdit: (id: number, name: string, category: string) => Promise<void>;
  onSelect: (item: WardrobeItemResponse) => void;
  selectedItems: WardrobeItemResponse[];
}

export const CategorySection: React.FC<Props> = ({
  category,
  items,
  onWear,
  onEdit,
  onSelect,
  selectedItems,
}) => {
  return (
    <Section>
      <Title>{category}</Title>
      <ItemsGrid>
        {items.map(item => (
          <WardrobeItem
            key={item.id}
            item={item}
            onWear={onWear}
            onEdit={onEdit}
            onSelect={onSelect}
            isSelected={selectedItems.some(selectedItem => selectedItem.id === item.id)}
          />
        ))}
      </ItemsGrid>
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-transform: lowercase;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;
