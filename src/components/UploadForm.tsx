import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Category } from '../types';

interface UploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('tops');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup the URL when component unmounts or when file changes
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Cleanup previous preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('image', file);
      await onSubmit(formData);
      navigate('/');
    }
  };

  return (
    <FormContainer>
      <PageTitle>add new item ✨</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>name</Label>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="enter item name"
          />
        </FormGroup>

        <FormGroup>
          <Label>category</Label>
          <Select value={category} onChange={e => setCategory(e.target.value as Category)} required>
            <option value="tops">tops</option>
            <option value="bottoms">bottoms</option>
            <option value="shoes">shoes</option>
            <option value="accessories">accessories</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>image</Label>
          <FileInputContainer>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              id="file-input"
            />
            <FileInputLabel htmlFor="file-input">📷 choose image</FileInputLabel>
            {file && <FileName>{file.name}</FileName>}
          </FileInputContainer>
          {preview && <ImagePreview src={preview} alt="Preview" />}
        </FormGroup>

        <SubmitButton type="submit">add to wardrobe ✨</SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(155, 107, 157, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

  option {
    color: #9b6b9d;
    font-family: 'Montserrat', sans-serif;
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #ffd1dc;
  color: #9b6b9d;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: lowercase;
  width: fit-content;

  &:hover {
    background-color: #d4a5d6;
    color: white;
    box-shadow: 0 4px 8px rgba(212, 165, 214, 0.3);
  }
`;

const FileName = styled.span`
  color: #9b6b9d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  text-transform: lowercase;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #ffd1dc;
  border: none;
  border-radius: 25px;
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;

  &:hover {
    background-color: #d4a5d6;
    color: white;
    box-shadow: 0 4px 8px rgba(212, 165, 214, 0.3);
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #9b6b9d;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-transform: lowercase;
`;