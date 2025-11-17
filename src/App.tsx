import CarEntryForm from './CarEntryForm';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      {/* CssBaseline kicks out the default browser margins/padding */}
      <CssBaseline />
      
      <Container maxWidth="lg">
        <CarEntryForm />
      </Container>
    </>
  );
}

export default App;