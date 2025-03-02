import styled from 'styled-components';

interface ContainerProps {
  sidebarOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  padding: 20px;
  margin-left: ${props => (props.sidebarOpen ? '250px' : '60px')};
  transition: all 0.3s ease;
  text-transform: lowercase;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 60px;
    padding: 10px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;

  @media (min-width: 1600px) {
    max-width: 1400px;
  }

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #9b6b9d;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(155, 107, 157, 0.1);
  text-transform: lowercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CategorySection = styled.section`
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(155, 107, 157, 0.1);
`;

export const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #d4a5d6;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-transform: lowercase;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

export const ItemCard = styled.div`
  border: 1px solid #ffd1dc;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #fff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 209, 220, 0.4);
    border-color: #d4a5d6;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

export const ItemName = styled.p`
  padding: 12px;
  margin: 0;
  text-align: center;
  font-size: 1rem;
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  text-transform: lowercase;
`;

export const UploadButton = styled.label`
  display: inline-block;
  padding: 12px 24px;
  background-color: #ffd1dc;
  color: #9b6b9d;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  border: 2px solid transparent;
  text-transform: lowercase;

  &:hover {
    background-color: #d4a5d6;
    color: white;
    box-shadow: 0 4px 8px rgba(212, 165, 214, 0.3);
  }

  input[type='file'] {
    display: none;
  }
`;
