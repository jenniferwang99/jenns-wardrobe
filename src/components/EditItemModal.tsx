import React, { useState } from 'react';
import styled from 'styled-components';
import { WardrobeItemResponse } from '../services/api';
import { Button } from './shared/Button';
import { useModal } from './shared/ModalProvider';
import { Category } from '../types';

interface EditItemModalProps {
  item: WardrobeItemResponse;
  onEdit: (id: number, name: string, category: string) => Promise<void>;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onEdit }) => {
  const { openModal } = useModal();

  const handleEditClick = () => {
    openModal(<EditItemForm item={item} onEdit={onEdit} />);
  };

  return (
    <Button variant="icon" onClick={handleEditClick}>
      ✏️
    </Button>
  );
};

interface EditItemFormProps {
  item: WardrobeItemResponse;
  onEdit: (id: number, name: string, category: string) => Promise<void>;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onEdit }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(item.item_name);
  const [category, setCategory] = useState<Category>(item.type);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    console.log('EditItemModal submitting with values:', {
      id: item.id,
      name,
      category,
    });

    try {
      if (!item.id) return;
      await onEdit(item.id, name, category);
      console.log('Edit successful');
      closeModal();
    } catch (err) {
      console.error('Edit failed:', err);
      setError('Failed to update item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ModalTitle>edit item ✨</ModalTitle>

      <FormGroup>
        <Label>name</Label>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="enter item name"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Label>category</Label>
        <Select
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
          required
          disabled={isSubmitting}
        >
          <option value="tops">tops</option>
          <option value="bottoms">bottoms</option>
          <option value="shoes">shoes</option>
          <option value="accessories">accessories</option>
        </Select>
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonGroup>
        <Button variant="secondary" type="button" onClick={closeModal} disabled={isSubmitting}>
          cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          {isSubmitting ? 'saving...' : 'save changes ✨'}
        </Button>
      </ButtonGroup>
    </Form>
  );
};

// Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 400px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #9b6b9d;
  margin: 0;
  text-transform: lowercase;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #9b6b9d;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-transform: lowercase;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ffd1dc;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #9b6b9d;
  outline: none;
  transition: all 0.3s ease;
  text-transform: lowercase;

  &:focus {
    border-color: #d4a5d6;
    box-shadow: 0 0 0 3px rgba(212, 165, 214, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #ffd1dc;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #9b6b9d;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: lowercase;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239b6b9d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2.5rem;

  &:focus {
    border-color: #d4a5d6;
    box-shadow: 0 0 0 3px rgba(212, 165, 214, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin: 0;
`;
