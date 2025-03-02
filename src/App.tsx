import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategorySection } from './components/CategorySection';
import { Navigation } from './components/Navigation';
import { TodaysOutfit } from './components/TodaysOutfit';
import { UploadForm } from './components/UploadForm';
import { ModalProvider } from './components/shared/ModalProvider';
import { useSidebar } from './context/SidebarContext';
import { apiService, WardrobeItemResponse } from './services/api';
import { dbService } from './services/db';
import { Category } from './types';

const App: React.FC = () => {
  const [items, setItems] = useState<WardrobeItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<WardrobeItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dbService.init();
        const fetchedItems = await apiService.getAllItems();
        setItems(fetchedItems);
      } catch (err) {
        setError('Failed to initialize the app. Please refresh the page.');
        console.error('Error initializing app:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleFileUpload = async (formData: FormData) => {
    try {
      const newItem = await apiService.addItem(formData);
      setItems(prevItems => [newItem, ...prevItems]);
      navigate('/');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleWear = async (id: number) => {
    try {
      const updatedItem = await apiService.incrementTimesWorn(id);
      setItems(prevItems => prevItems.map(item => (item.id === id ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating times worn:', error);
    }
  };

  const handleEdit = async (id: number, name: string, category: string) => {
    try {
      const updatedItem = await apiService.updateItem(id, { name, category });
      setItems(prevItems => prevItems.map(item => (item.id === id ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSelectItem = (item: WardrobeItemResponse) => {
    setSelectedItems(prev => {
      const isAlreadySelected = prev.some(i => i.id === item.id);
      if (isAlreadySelected) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveFromOutfit = (id: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  if (isLoading) {
    return <LoadingMessage>loading your wardrobe...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const itemsByCategory = {
    tops: items.filter(item => item.type === 'tops'),
    bottoms: items.filter(item => item.type === 'bottoms'),
    shoes: items.filter(item => item.type === 'shoes'),
    accessories: items.filter(item => item.type === 'accessories'),
  };

  return (
    <ModalProvider>
      <AppContainer isSidebarOpen={isSidebarOpen}>
        <Navigation />
        <MainContent isSidebarOpen={isSidebarOpen}>
          <Routes>
            <Route
              path="/"
              element={
                <ContentLayout>
                  <LeftSection>
                    <PageTitle>what are you wearing today? ✨</PageTitle>
                    {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
                      <CategorySection
                        key={category}
                        category={category as Category}
                        items={categoryItems}
                        onWear={handleWear}
                        onEdit={handleEdit}
                        onSelect={handleSelectItem}
                        selectedItems={selectedItems}
                      />
                    ))}
                  </LeftSection>
                  <RightSection>
                    <TodaysOutfit
                      selectedItems={selectedItems}
                      onRemoveItem={handleRemoveFromOutfit}
                    />
                  </RightSection>
                </ContentLayout>
              }
            />
            <Route path="/upload" element={<UploadForm onSubmit={handleFileUpload} />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </ModalProvider>
  );
};

const AppContainer = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #faf0f5 0%, #f3e5f5 100%);
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: 2rem;
  margin-left: ${props => (props.isSidebarOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 2rem;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const PageTitle = styled.h1`
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: lowercase;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9b6b9d;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff6b6b;
  font-size: 1.2rem;
`;

export default App;
